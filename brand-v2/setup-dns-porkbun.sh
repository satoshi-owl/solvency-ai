#!/bin/bash
# Porkbun DNS Configuration for Solvency AI
# Configures DNS records for GitHub Pages deployment

set -e

echo "🦉 Solvency AI - Porkbun DNS Setup"
echo "===================================="
echo ""

# Check for .env.porkbun file
if [ ! -f .env.porkbun ]; then
  echo "❌ Error: .env.porkbun file not found"
  echo ""
  echo "Create .env.porkbun with:"
  echo "  PORKBUN_API_KEY=your_api_key_here"
  echo "  PORKBUN_SECRET_KEY=your_secret_key_here"
  echo "  DOMAIN=solvency.money"
  echo ""
  exit 1
fi

# Load environment variables
source .env.porkbun

# Validate required variables
if [ -z "$PORKBUN_API_KEY" ] || [ -z "$PORKBUN_SECRET_KEY" ] || [ -z "$DOMAIN" ]; then
  echo "❌ Error: Missing required environment variables"
  echo "Required: PORKBUN_API_KEY, PORKBUN_SECRET_KEY, DOMAIN"
  exit 1
fi

echo "📝 Configuration:"
echo "  Domain: $DOMAIN"
echo "  Deployment: GitHub Pages"
echo ""

# GitHub Pages IP addresses
GH_IPS=(
  "185.199.108.153"
  "185.199.109.153"
  "185.199.110.153"
  "185.199.111.153"
)

echo "🔧 Setting up DNS records..."
echo ""

# Function to create DNS record via Porkbun API
create_record() {
  local type=$1
  local name=$2
  local content=$3
  local ttl=${4:-600}
  
  echo "  Creating $type record: $name → $content"
  
  curl -s -X POST "https://porkbun.com/api/json/v3/dns/create/$DOMAIN" \
    -H "Content-Type: application/json" \
    -d "{
      \"apikey\": \"$PORKBUN_API_KEY\",
      \"secretapikey\": \"$PORKBUN_SECRET_KEY\",
      \"name\": \"$name\",
      \"type\": \"$type\",
      \"content\": \"$content\",
      \"ttl\": \"$ttl\"
    }" | jq -r '.status'
}

# Delete existing records (optional - be careful!)
# Uncomment if you want to clear old records first
# echo "⚠️  Deleting existing A and CNAME records..."
# curl -s -X POST "https://porkbun.com/api/json/v3/dns/deleteByNameType/$DOMAIN/A/@" \
#   -d "{\"apikey\":\"$PORKBUN_API_KEY\",\"secretapikey\":\"$PORKBUN_SECRET_KEY\"}"

# Create A records for GitHub Pages
echo "📍 Creating A records for GitHub Pages..."
for ip in "${GH_IPS[@]}"; do
  create_record "A" "@" "$ip"
done

# Create CNAME for www subdomain
echo ""
echo "🔗 Creating CNAME record for www..."
create_record "CNAME" "www" "solvency-ai.github.io"

echo ""
echo "✅ DNS configuration complete!"
echo ""
echo "⏱️  DNS propagation may take 5-60 minutes"
echo "🔍 Check status: https://dnschecker.org/#A/$DOMAIN"
echo ""
echo "Next steps:"
echo "  1. Push CNAME file to GitHub repo"
echo "  2. Enable GitHub Pages in repo settings"
echo "  3. Wait for DNS propagation"
echo "  4. Visit https://$DOMAIN"
echo ""
echo "🦉 Owl watches your deployment..."
