 const nodemailer = require('nodemailer')

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Welcome email
exports.sendWelcomeEmail = async (name, email, role) => {
  const mailOptions = {
    from: `"NGO Connect" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '🌍 Welcome to NGO Connect!',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1b4332; padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fff; margin: 0;">🌍 NGO Connect</h1>
          <p style="color: #aaa; margin: 8px 0 0;">Accelerating SDG Progress</p>
        </div>
        <div style="background-color: #fff; padding: 32px; border: 1px solid #e0e0e0;">
          <h2 style="color: #1b4332;">Welcome, ${name}! 👋</h2>
          <p style="color: #555; line-height: 1.6;">
            Thank you for joining NGO Connect as a <strong>${role}</strong>.
            You are now part of a community working towards the UN Sustainable Development Goals.
          </p>
          <div style="background-color: #f0f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1b4332; margin-top: 0;">What you can do:</h3>
            <ul style="color: #555; line-height: 2;">
              <li>🏛️ Discover verified NGOs</li>
              <li>💰 Make secure donations</li>
              <li>📅 Join events and campaigns</li>
              <li>📊 Track your impact</li>
            </ul>
          </div>
          <div style="text-align: center; margin: 28px 0;">
            <a href="https://ngo-connect-backend-mkg0.onrender.com"
              style="background-color: #2d6a4f; color: #fff; padding: 14px 32px;
                     border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Get Started →
            </a>
          </div>
        </div>
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center;
                    border-radius: 0 0 12px 12px; font-size: 12px; color: #aaa;">
          © 2025 NGO Connect | K.Ramakrishnan College of Engineering
        </div>
      </div>
    `
  }
  await transporter.sendMail(mailOptions)
}

// Donation confirmation email
exports.sendDonationEmail = async (name, email, amount, ngoName) => {
  const mailOptions = {
    from: `"NGO Connect" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '💰 Donation Confirmed - Thank You!',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1b4332; padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fff; margin: 0;">🌍 NGO Connect</h1>
        </div>
        <div style="background-color: #fff; padding: 32px; border: 1px solid #e0e0e0;">
          <h2 style="color: #1b4332;">Thank you for your donation! 💰</h2>
          <p style="color: #555;">Dear ${name},</p>
          <p style="color: #555; line-height: 1.6;">
            Your donation has been successfully processed.
            Your generosity helps us make a real difference!
          </p>
          <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2d6a4f;">
            <h3 style="color: #1b4332; margin-top: 0;">Donation Receipt</h3>
            <table style="width: 100%; color: #555;">
              <tr>
                <td style="padding: 6px 0;"><strong>Amount:</strong></td>
                <td>₹${amount}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;"><strong>NGO:</strong></td>
                <td>${ngoName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;"><strong>Date:</strong></td>
                <td>${new Date().toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0;"><strong>Status:</strong></td>
                <td style="color: #2d6a4f;"><strong>✅ Confirmed</strong></td>
              </tr>
            </table>
          </div>
          <p style="color: #555; line-height: 1.6;">
            Your contribution will directly impact the lives of people
            supported by <strong>${ngoName}</strong>.
          </p>
        </div>
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center;
                    border-radius: 0 0 12px 12px; font-size: 12px; color: #aaa;">
          © 2025 NGO Connect | K.Ramakrishnan College of Engineering
        </div>
      </div>
    `
  }
  await transporter.sendMail(mailOptions)
}

// Event reminder email
exports.sendEventReminderEmail = async (name, email, eventName, date, location) => {
  const mailOptions = {
    from: `"NGO Connect" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `📅 Event Reminder: ${eventName}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1b4332; padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fff; margin: 0;">🌍 NGO Connect</h1>
        </div>
        <div style="background-color: #fff; padding: 32px; border: 1px solid #e0e0e0;">
          <h2 style="color: #1b4332;">Event Reminder 📅</h2>
          <p style="color: #555;">Dear ${name},</p>
          <p style="color: #555; line-height: 1.6;">
            This is a reminder for your upcoming event!
          </p>
          <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1565c0;">
            <h3 style="color: #1565c0; margin-top: 0;">${eventName}</h3>
            <p style="color: #555; margin: 4px 0;">📅 Date: <strong>${date}</strong></p>
            <p style="color: #555; margin: 4px 0;">📍 Location: <strong>${location}</strong></p>
          </div>
          <p style="color: #555;">We look forward to seeing you there! 🎉</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center;
                    border-radius: 0 0 12px 12px; font-size: 12px; color: #aaa;">
          © 2025 NGO Connect | K.Ramakrishnan College of Engineering
        </div>
      </div>
    `
  }
  await transporter.sendMail(mailOptions)
}

// NGO verification email
exports.sendVerificationEmail = async (name, email, status) => {
  const approved = status === 'approved'
  const mailOptions = {
    from: `"NGO Connect" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: approved
      ? '✅ Your NGO has been Verified!'
      : '❌ NGO Verification Update',
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1b4332; padding: 32px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fff; margin: 0;">🌍 NGO Connect</h1>
        </div>
        <div style="background-color: #fff; padding: 32px; border: 1px solid #e0e0e0;">
          <h2 style="color: ${approved ? '#2d6a4f' : '#c62828'};">
            ${approved ? '✅ NGO Verified Successfully!' : '❌ Verification Unsuccessful'}
          </h2>
          <p style="color: #555;">Dear ${name},</p>
          <p style="color: #555; line-height: 1.6;">
            ${approved
              ? 'Congratulations! Your NGO has been verified on NGO Connect. You can now access all platform features and start receiving donations.'
              : 'Unfortunately, your NGO verification was unsuccessful. Please review your documents and resubmit.'}
          </p>
          ${approved ? `
            <div style="background-color: #e8f5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1b4332; margin-top: 0;">You can now:</h3>
              <ul style="color: #555; line-height: 2;">
                <li>✅ Receive donations from donors</li>
                <li>✅ Post events and campaigns</li>
                <li>✅ Connect with volunteers</li>
                <li>✅ Access the NGO communication hub</li>
              </ul>
            </div>
          ` : ''}
        </div>
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center;
                    border-radius: 0 0 12px 12px; font-size: 12px; color: #aaa;">
          © 2025 NGO Connect | K.Ramakrishnan College of Engineering
        </div>
      </div>
    `
  }
  await transporter.sendMail(mailOptions)
}
