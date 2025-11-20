#!/bin/bash

# Strapi Deployment Setup Script
# This script helps generate the required environment variables for Strapi

set -e

echo "=========================================="
echo "  Strapi CMS - Environment Setup"
echo "=========================================="
echo ""

ENV_FILE="../.env"

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: .env file not found at $ENV_FILE"
    echo "Please create a .env file in the project root first."
    exit 1
fi

echo "📝 Generating secure random keys for Strapi..."
echo ""

# Generate secrets
JWT_SECRET=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
API_TOKEN_SALT=$(openssl rand -base64 32)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
APP_KEY1=$(openssl rand -base64 32)
APP_KEY2=$(openssl rand -base64 32)
APP_KEY3=$(openssl rand -base64 32)
APP_KEY4=$(openssl rand -base64 32)
APP_KEYS="$APP_KEY1,$APP_KEY2,$APP_KEY3,$APP_KEY4"

echo "✅ Keys generated successfully!"
echo ""
echo "=========================================="
echo "  Add these to your .env file:"
echo "=========================================="
echo ""
cat << EOF
# Strapi Configuration
STRAPI_POSTGRES_USER=strapi
STRAPI_POSTGRES_PASSWORD=$(openssl rand -base64 24)
STRAPI_POSTGRES_DB=strapi

# Strapi Security Keys (Auto-generated on $(date))
STRAPI_JWT_SECRET=$JWT_SECRET
STRAPI_ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
STRAPI_API_TOKEN_SALT=$API_TOKEN_SALT
STRAPI_TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT
STRAPI_APP_KEYS=$APP_KEYS
EOF
echo ""
echo "=========================================="
echo ""

# Ask if user wants to append to .env file
read -p "Would you like to append these variables to $ENV_FILE? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Check if Strapi config already exists
    if grep -q "STRAPI_JWT_SECRET" "$ENV_FILE"; then
        echo "⚠️  Warning: Strapi configuration already exists in $ENV_FILE"
        read -p "Do you want to overwrite it? This will REPLACE existing keys! (y/n) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            # Remove old Strapi config
            sed -i '/^# Strapi Configuration/,/^STRAPI_APP_KEYS=/d' "$ENV_FILE"
            sed -i '/^STRAPI_/d' "$ENV_FILE"
        else
            echo "❌ Cancelled. Please manually add the variables above to your .env file."
            exit 0
        fi
    fi

    # Append to .env file
    cat << EOF >> "$ENV_FILE"

# Strapi Configuration (Generated on $(date))
STRAPI_POSTGRES_USER=strapi
STRAPI_POSTGRES_PASSWORD=$(openssl rand -base64 24)
STRAPI_POSTGRES_DB=strapi

# Strapi Security Keys
STRAPI_JWT_SECRET=$JWT_SECRET
STRAPI_ADMIN_JWT_SECRET=$ADMIN_JWT_SECRET
STRAPI_API_TOKEN_SALT=$API_TOKEN_SALT
STRAPI_TRANSFER_TOKEN_SALT=$TRANSFER_TOKEN_SALT
STRAPI_APP_KEYS=$APP_KEYS
EOF
    
    echo "✅ Configuration added to $ENV_FILE"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Review the generated passwords in .env"
    echo "   2. Build and start Strapi:"
    echo "      cd .."
    echo "      docker compose -f docker-compose.services.yml build strapi"
    echo "      docker compose -f docker-compose.services.yml up -d strapi strapi-postgres"
    echo "   3. Check logs:"
    echo "      docker compose -f docker-compose.services.yml logs -f strapi"
    echo "   4. Access admin panel: https://strapi.heronix.org/admin"
else
    echo "📋 Please manually copy the configuration above to your .env file."
fi

echo ""
echo "=========================================="
echo "✅ Setup complete!"
echo "=========================================="
