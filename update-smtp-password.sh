#!/bin/bash
# Update SMTP password script

echo "Portfolio SMTP Password Update"
echo "==============================="

# Prompt for app password
read -s -p "Enter your Google App Password (16 characters, no spaces): " app_password
echo

if [ ${#app_password} -ne 16 ]; then
    echo "⚠️  Warning: App password should be 16 characters. Please double-check."
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Update cancelled."
        exit 1
    fi
fi

# Update the .env.local file
cat > .env.local << EOF
# SMTP Configuration for Portfolio Contact Form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=gonzalesrondether86@gmail.com
SMTP_PASS=$app_password
EOF

echo
echo "✅ .env.local file updated successfully!"
echo "Your SMTP password has been saved securely."
echo
echo "Now starting the development server..."
npm run dev