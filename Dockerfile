FROM rust:1.93-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libssl-dev \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Solana CLI
RUN sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"
ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"

# Install Anchor
RUN cargo install --git https://github.com/coral-xyz/anchor --tag v0.30.1 anchor-cli

# Set working directory
WORKDIR /workspace

# Copy project
COPY . .

# Build command will be run interactively
CMD ["bash"]
