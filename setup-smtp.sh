#!/bin/bash
# Setup script for Portfolio SMTP Configuration

echo "Portfolio Contact Form Setup"
echo "============================="

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "⚠️  Warning: .env.local file already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 1
    fi
fi

echo "This script will help you configure SMTP settings for the contact form."
echo

# Ask for SMTP provider
echo "Select your email provider:"
echo "1) Gmail"
echo "2) Outlook/Hotmail"
echo "3) Yahoo"
echo "4) Custom SMTP"
read -p "Enter your choice (1-4): " choice

echo

case $choice in
    1)
        SMTP_HOST="smtp.gmail.com"
        SMTP_PORT="465"
        SMTP_SECURE="true"
        echo "For Gmail setup, you need to:"
        echo "1. Enable 2-Factor Authentication in your Google Account"
        echo "2. Go to Google Account → Security → App passwords"
        echo "3. Generate an app password for 'Mail'"
        echo
        ;;
    2)
        SMTP_HOST="smtp-mail.outlook.com"
        SMTP_PORT="587"
        SMTP_SECURE="false"
        ;;
    3)
        SMTP_HOST="smtp.mail.yahoo.com"
        SMTP_PORT="587"
        SMTP_SECURE="false"
        echo "For Yahoo setup, you need to:"
        echo "1. Go to Yahoo Mail → Account Info → Account Security"
        echo "2. Generate an app password"
        echo
        ;;
    4)
        read -p "SMTP Host: " SMTP_HOST
        read -p "SMTP Port: " SMTP_PORT
        read -p "Secure connection (true/false): " SMTP_SECURE
        ;;
    *)
        echo "Invalid choice. Exiting."
        exit 1
        ;;
esac

read -p "Your email address: " SMTP_USER
read -p "Your app password (or regular password for some providers): " SMTP_PASS

echo
echo "Creating .env.local file with your configuration..."

# Create the .env.local file
cat > .env.local << EOF
# SMTP Configuration for Portfolio Contact Form
SMTP_HOST=$SMTP_HOST
SMTP_PORT=$SMTP_PORT
SMTP_SECURE=$SMTP_SECURE
SMTP_USER=$SMTP_USER
SMTP_PASS=$SMTP_PASS
EOF

echo
echo "✅ .env.local file created successfully!"
echo
echo "Your contact form is now configured with the following settings:"
echo "Host: $SMTP_HOST"
echo "Port: $SMTP_PORT"
echo "Secure: $SMTP_SECURE"
echo "User: $SMTP_USER"
echo
echo "Start your development server with: npm run dev"
echo "Or rebuild and deploy your application to use these settings."