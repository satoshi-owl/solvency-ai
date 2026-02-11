# Code for Solana Playground

Copy this entire file and paste into the Playground editor:

```rust
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer, MintTo, Burn};

declare_id!("11111111111111111111111111111111");

#[program]
pub mod solvency_vault {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let vault = &mut ctx.accounts.vault;
        vault.authority = ctx.accounts.authority.key();
        vault.usdc_mint = ctx.accounts.usdc_mint.key();
        vault.solv_mint = ctx.accounts.solv_mint.key();
        vault.total_deposits = 0;
        vault.total_yield = 0;
        vault.paused = false;
        
        msg!("Vault initialized");
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        require!(!ctx.accounts.vault.paused, ErrorCode::Paused);
        require!(amount > 0, ErrorCode::InvalidAmount);

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

        // Mint solvUSD to user (1:1)
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

        ctx.accounts.vault.total_deposits += amount;
        msg!("Deposited {} USDC, minted {} solvUSD", amount, amount);
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        require!(!ctx.accounts.vault.paused, ErrorCode::Paused);
        require!(amount > 0, ErrorCode::InvalidAmount);

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

        ctx.accounts.vault.total_deposits -= amount;
        msg!("Withdrew {} USDC, burned {} solvUSD", amount, amount);
        Ok(())
    }

    pub fn pause(ctx: Context<AdminAction>) -> Result<()> {
        ctx.accounts.vault.paused = true;
        msg!("Vault paused");
        Ok(())
    }

    pub fn unpause(ctx: Context<AdminAction>) -> Result<()> {
        ctx.accounts.vault.paused = false;
        msg!("Vault unpaused");
        Ok(())
    }
}

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
    
    #[account(mut, constraint = user_usdc.mint == vault.usdc_mint)]
    pub user_usdc: Account<'info, TokenAccount>,
    
    #[account(mut, constraint = user_solv.mint == vault.solv_mint)]
    pub user_solv: Account<'info, TokenAccount>,
    
    #[account(mut, constraint = vault_usdc.mint == vault.usdc_mint)]
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
    
    #[account(mut, constraint = user_usdc.mint == vault.usdc_mint)]
    pub user_usdc: Account<'info, TokenAccount>,
    
    #[account(mut, constraint = user_solv.mint == vault.solv_mint)]
    pub user_solv: Account<'info, TokenAccount>,
    
    #[account(mut, constraint = vault_usdc.mint == vault.usdc_mint)]
    pub vault_usdc: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct AdminAction<'info> {
    #[account(mut, has_one = authority)]
    pub vault: Account<'info, Vault>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Vault {
    pub authority: Pubkey,
    pub usdc_mint: Pubkey,
    pub solv_mint: Pubkey,
    pub total_deposits: u64,
    pub total_yield: u64,
    pub bump: u8,
    pub paused: bool,
}

impl Vault {
    pub const LEN: usize = 32 + 32 + 32 + 8 + 8 + 1 + 1;
}

#[error_code]
pub enum ErrorCode {
    #[msg("Vault is paused")]
    Paused,
    #[msg("Invalid amount")]
    InvalidAmount,
}
```

---

## Notes

- This is the complete vault program
- Includes: initialize, deposit, withdraw, pause/unpause
- Fully collateralized (1:1 USDC ↔ solvUSD)
- Emergency controls (pause mechanism)
- Copy the entire code block above into Playground
- Make sure to click "Build" before "Deploy"

After deploying, you'll get a program ID that looks like:
`9fTt...HuMn` (Base58 address)

Save that - we need it to connect the agent!
