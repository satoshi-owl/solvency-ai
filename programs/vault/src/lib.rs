use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer, MintTo, Burn};

declare_id!("9fTtaG9pesZrDedyVgeQmFxZtqbR9znTLvpSXZW4HuMn");

#[program]
pub mod solvency_vault {
    use super::*;

    /// Initialize the vault
    pub fn initialize(
        ctx: Context<Initialize>,
        vault_bump: u8,
        max_deposit: u64,
        max_total_deposits: u64,
        min_deposit: u64,
    ) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.authority = ctx.accounts.authority.key();
        vault.usdc_mint = ctx.accounts.usdc_mint.key();
        vault.solv_mint = ctx.accounts.solv_mint.key();
        vault.total_deposits = 0;
        vault.total_yield = 0;
        vault.bump = vault_bump;
        vault.paused = false;
        
        // FIX #4: Initialize deposit caps
        vault.max_deposit = max_deposit;
        vault.max_total_deposits = max_total_deposits;
        vault.min_deposit = min_deposit;
        
        // FIX #1: Transfer mint authority to vault (prevents deployer rug pull)
        let cpi_accounts = token::SetAuthority {
            current_authority: ctx.accounts.authority.to_account_info(),
            account_or_mint: ctx.accounts.solv_mint.to_account_info(),
        };
        token::set_authority(
            CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts),
            spl_token::instruction::AuthorityType::MintTokens,
            Some(vault.key()),
        )?;
        
        msg!("Vault initialized with caps: min={}, max={}, total_max={}", min_deposit, max_deposit, max_total_deposits);
        Ok(())
    }

    /// Deposit USDC and mint solvUSD (1:1)
    pub fn deposit(
        ctx: Context<Deposit>,
        amount: u64,
    ) -> Result<()> {
        require!(!ctx.accounts.vault.paused, VaultError::Paused);
        require!(amount > 0, VaultError::InvalidAmount);
        
        // FIX #4: Validate deposit amount against caps
        require!(
            amount >= ctx.accounts.vault.min_deposit && amount <= ctx.accounts.vault.max_deposit,
            VaultError::DepositOutOfBounds
        );
        
        // FIX #3 & #4: Use checked_add to prevent overflow + validate total cap
        let new_total = ctx.accounts.vault.total_deposits
            .checked_add(amount)
            .ok_or(VaultError::Overflow)?;
        require!(
            new_total <= ctx.accounts.vault.max_total_deposits,
            VaultError::VaultCapacityExceeded
        );

        // Transfer USDC from user to vault
        let cpi_accounts = Transfer {
            from: ctx.accounts.user_usdc.to_account_info(),
            to: ctx.accounts.vault_usdc.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
        );
        token::transfer(cpi_ctx, amount)?;

        // Mint solvUSD to user (1:1 ratio)
        let vault_key = ctx.accounts.vault.key();
        let seeds = &[
            b"vault".as_ref(),
            vault_key.as_ref(),
            &[ctx.accounts.vault.bump],
        ];
        let signer = &[&seeds[..]];

        let cpi_accounts = MintTo {
            mint: ctx.accounts.solv_mint.to_account_info(),
            to: ctx.accounts.user_solv.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            signer,
        );
        token::mint_to(cpi_ctx, amount)?;

        // Update vault state (use checked_add for safety)
        ctx.accounts.vault.total_deposits = new_total;

        msg!("Deposited {} USDC, minted {} solvUSD", amount, amount);
        Ok(())
    }

    /// Withdraw: burn solvUSD and return USDC + yield
    pub fn withdraw(
        ctx: Context<Withdraw>,
        amount: u64,
    ) -> Result<()> {
        require!(!ctx.accounts.vault.paused, VaultError::Paused);
        require!(amount > 0, VaultError::InvalidAmount);

        // Burn solvUSD from user
        let cpi_accounts = Burn {
            mint: ctx.accounts.solv_mint.to_account_info(),
            from: ctx.accounts.user_solv.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
        );
        token::burn(cpi_ctx, amount)?;

        // Transfer USDC from vault to user
        // TODO: Add yield calculation and distribution
        let vault_key = ctx.accounts.vault.key();
        let seeds = &[
            b"vault".as_ref(),
            vault_key.as_ref(),
            &[ctx.accounts.vault.bump],
        ];
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_usdc.to_account_info(),
            to: ctx.accounts.user_usdc.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts,
            signer,
        );
        token::transfer(cpi_ctx, amount)?;

        // Update vault state (use checked_sub for safety)
        ctx.accounts.vault.total_deposits = ctx.accounts.vault.total_deposits
            .checked_sub(amount)
            .ok_or(VaultError::Underflow)?;

        msg!("Withdrew {} USDC, burned {} solvUSD", amount, amount);
        Ok(())
    }

    /// Emergency pause (authority only)
    pub fn pause(ctx: Context<AdminAction>) -> Result<()> {
        ctx.accounts.vault.paused = true;
        msg!("Vault paused");
        Ok(())
    }

    /// Resume operations (authority only)
    pub fn unpause(ctx: Context<AdminAction>) -> Result<()> {
        ctx.accounts.vault.paused = false;
        msg!("Vault unpaused");
        Ok(())
    }
}

// Context structs
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Vault::LEN,
        seeds = [b"vault"],
        bump
    )]
    pub vault: Account<'info, Vault>,
    
    pub usdc_mint: Account<'info, Mint>,
    
    #[account(
        mut,
        seeds = [b"solv-mint"],
        bump
    )]
    pub solv_mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub authority: Signer<'info>,
    
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut, has_one = usdc_mint, has_one = solv_mint)]
    pub vault: Account<'info, Vault>,
    
    pub usdc_mint: Account<'info, Mint>,
    pub solv_mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(
        mut,
        constraint = user_usdc.mint == vault.usdc_mint
    )]
    pub user_usdc: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = user_solv.mint == vault.solv_mint
    )]
    pub user_solv: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = vault_usdc.mint == vault.usdc_mint,
        constraint = vault_usdc.owner == vault.key() @ VaultError::InvalidVaultOwner  // FIX #2
    )]
    pub vault_usdc: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut, has_one = usdc_mint, has_one = solv_mint)]
    pub vault: Account<'info, Vault>,
    
    pub usdc_mint: Account<'info, Mint>,
    pub solv_mint: Account<'info, Mint>,
    
    #[account(mut)]
    pub user: Signer<'info>,
    
    #[account(
        mut,
        constraint = user_usdc.mint == vault.usdc_mint
    )]
    pub user_usdc: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = user_solv.mint == vault.solv_mint
    )]
    pub user_solv: Account<'info, TokenAccount>,
    
    #[account(
        mut,
        constraint = vault_usdc.mint == vault.usdc_mint,
        constraint = vault_usdc.owner == vault.key() @ VaultError::InvalidVaultOwner  // FIX #2
    )]
    pub vault_usdc: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct AdminAction<'info> {
    #[account(mut, has_one = authority)]
    pub vault: Account<'info, Vault>,
    pub authority: Signer<'info>,
}

// State
#[account]
pub struct Vault {
    pub authority: Pubkey,
    pub usdc_mint: Pubkey,
    pub solv_mint: Pubkey,
    pub total_deposits: u64,
    pub total_yield: u64,
    pub bump: u8,
    pub paused: bool,
    // FIX #4: Deposit limits
    pub max_deposit: u64,
    pub max_total_deposits: u64,
    pub min_deposit: u64,
}

impl Vault {
    pub const LEN: usize = 32 + 32 + 32 + 8 + 8 + 1 + 1 + 8 + 8 + 8;  // Added 3x u64
}

// Errors
#[error_code]
pub enum VaultError {
    #[msg("Vault is paused")]
    Paused,
    #[msg("Invalid amount")]
    InvalidAmount,
    // FIX #2: New error for ownership validation
    #[msg("Vault USDC account owner mismatch")]
    InvalidVaultOwner,
    // FIX #3: Overflow/underflow errors
    #[msg("Arithmetic overflow")]
    Overflow,
    #[msg("Arithmetic underflow")]
    Underflow,
    // FIX #4: Deposit cap errors
    #[msg("Deposit amount out of bounds (min/max)")]
    DepositOutOfBounds,
    #[msg("Vault capacity exceeded")]
    VaultCapacityExceeded,
}
