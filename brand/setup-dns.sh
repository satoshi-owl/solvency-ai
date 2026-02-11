#!/bin/bash

# Load Porkbun credentials
source /root/.openclaw/workspace/.env.porkbun

# Porkbun API endpoint
API_URL="https://porkbun.com/api/json/v3"

# Server IP
SERVER_IP="38.180.145.215"

echo "Configuring DNS for ${DOMAIN}..."

# Create A record for @ (root domain)
curl -X POST "${API_URL}/dns/create/${DOMAIN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"secretapikey\": \"${PORKBUN_SECRET_KEY}\",
    \"apikey\": \"${PORKBUN_API_KEY}\",
    \"name\": \"\",
    \"type\": \"A\",
    \"content\": \"${SERVER_IP}\",
    \"ttl\": \"300\"
  }"

echo ""
echo "DNS configuration complete!"
echo "Website will be accessible at: http://${DOMAIN}:8080"
echo ""
echo "Note: For port 80 access, configure a reverse proxy (nginx/caddy) or use a service like Cloudflare."
