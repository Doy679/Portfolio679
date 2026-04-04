#!/usr/bin/env node

// Test script to verify SMTP configuration
require('dotenv').config({ path: './.env.local' });

const nodemailer = require('nodemailer');

async function testSMTP() {
  console.log('Testing SMTP configuration...\n');

  // Check if environment variables are set
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error('❌ Error: Missing SMTP configuration in .env.local file.');
    console.log('Please make sure all of these variables are set:');
    console.log('  - SMTP_HOST');
    console.log('  - SMTP_PORT');
    console.log('  - SMTP_USER');
    console.log('  - SMTP_PASS');
    process.exit(1);
  }

  console.log('✅ Environment variables found:');
  console.log(`   Host: ${process.env.SMTP_HOST}`);
  console.log(`   Port: ${process.env.SMTP_PORT}`);
  console.log(`   User: ${process.env.SMTP_USER}`);
  console.log(`   Secure: ${process.env.SMTP_SECURE || 'false'}`);

  try {
    // Create transporter with SMTP configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Test the connection
    console.log('\n⏳ Testing connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');

    // Test sending a test email
    console.log('\n⏳ Sending test email...');
    const info = await transporter.sendMail({
      from: `"Portfolio Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // Send to yourself for testing
      subject: 'Portfolio SMTP Test',
      text: 'This is a test email from your portfolio contact form.',
      html: '<h1>Portfolio SMTP Test</h1><p>This is a test email from your portfolio contact form.</p>',
    });

    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log('\n🎉 SMTP configuration is working correctly!');
  } catch (error) {
    console.error('❌ Error with SMTP configuration:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error('\n💡 This usually means your username or password is incorrect.');
      console.log('   Make sure you\'re using an app password if you\'re using Gmail with 2FA enabled.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Connection to SMTP server was refused.');
      console.log('   Check your host and port settings.');
    } else if (error.code === 'ENOTFOUND') {
      console.error('\n💡 SMTP server not found.');
      console.log('   Check your host setting.');
    } else {
      console.error('\n💡', error.message);
    }
    
    process.exit(1);
  }
}

testSMTP();