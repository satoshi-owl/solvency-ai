# Deployment Strategy - Solana Playground

**Reason:** Local toolchain blocked by Cargo version incompatibilities

## Steps

### 1. Prepare Code for Playground
- Simplify vault program to single-file if needed
- Remove complex dependencies
- Focus on core deposit/withdraw logic

### 2. Deploy via solpg.io
1. Go to https://solpg.io
2. Create new Anchor project
3. Paste simplified vault code
4. Build in browser (uses compatible toolchain)
5. Deploy to testnet using playground wallet
6. Get program ID

### 3. Transfer Authority
- Transfer upgrade authority to our wallet
- Verify deployment
- Test basic functionality

### 4. Connect Agent
- Update agent config with deployed program ID
- Test agent interaction with deployed program

## Alternative: Pre-Built Programs
If Playground also fails, deploy minimal demo program:
- Token mint/burn only
- Demonstrate concept
- Include full Anchor code as "production version"

## Timeline
- Preparation: 30 min
- Playground deploy: 15 min  
- Testing: 30 min
- **Total: ~1.5 hours**
