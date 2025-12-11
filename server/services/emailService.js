import nodemailer from 'nodemailer'

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

// Send contact form email
export const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0ea5e9, #a855f7); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">Contact Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${contactData.name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${contactData.email}" style="color: #0ea5e9;">${contactData.email}</a></p>
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${contactData.subject}</p>
              <p style="margin: 10px 0;"><strong>Date:</strong> ${new Date(contactData.timestamp).toLocaleString()}</p>
              
              <div style="margin-top: 20px;">
                <h3 style="color: #1f2937; margin-bottom: 10px;">Message:</h3>
                <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; border-left: 4px solid #0ea5e9;">
                  <p style="margin: 0; white-space: pre-wrap;">${contactData.message}</p>
                </div>
              </div>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <a href="mailto:${contactData.email}" 
                 style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Reply to ${contactData.name}
              </a>
            </div>
          </div>
          
          <div style="background: #1f2937; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">This email was sent from your portfolio contact form</p>
            <p style="margin: 5px 0 0 0;">Portfolio Website - Ash Had P A</p>
          </div>
        </div>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Contact email sent:', info.messageId)
    return info

  } catch (error) {
    console.error('❌ Email sending failed:', error)
    throw error
  }
}

// Send auto-reply to user
export const sendAutoReply = async (contactData) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `"Ash Had P A" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: contactData.email,
      subject: 'Thank you for reaching out!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0ea5e9, #a855f7); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">I've received your message</p>
          </div>
          
          <div style="padding: 30px; background: #f8fafc;">
            <p style="color: #1f2937; font-size: 16px; line-height: 1.6;">
              Hi ${contactData.name},
            </p>
            
            <p style="color: #1f2937; font-size: 16px; line-height: 1.6;">
              Thank you for reaching out! I've received your message about <strong>"${contactData.subject}"</strong> 
              and I'll get back to you as soon as possible.
            </p>
            
            <p style="color: #1f2937; font-size: 16px; line-height: 1.6;">
              In the meantime, feel free to check out my latest projects on 
              <a href="https://github.com/ashhadpa" style="color: #0ea5e9;">GitHub</a> 
              or connect with me on 
              <a href="https://linkedin.com/in/ashhad-36L00009" style="color: #0ea5e9;">LinkedIn</a>.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0ea5e9;">
              <h3 style="color: #1f2937; margin-top: 0;">Your Message:</h3>
              <p style="color: #6b7280; font-style: italic; margin: 0;">"${contactData.message}"</p>
            </div>
            
            <p style="color: #1f2937; font-size: 16px; line-height: 1.6;">
              Best regards,<br>
              <strong>Ash Had P A</strong><br>
              MERN Stack Developer
            </p>
          </div>
          
          <div style="background: #1f2937; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">This is an automated response. Please do not reply to this email.</p>
            <p style="margin: 5px 0 0 0;">
              <a href="https://ashhadpa.dev" style="color: #0ea5e9;">ashhadpa.dev</a> | 
              <a href="mailto:ashaad.pa@gmail.com" style="color: #0ea5e9;">ashaad.pa@gmail.com</a>
            </p>
          </div>
        </div>
      `
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Auto-reply sent:', info.messageId)
    return info

  } catch (error) {
    console.error('❌ Auto-reply failed:', error)
    throw error
  }
}

// Test email configuration
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter()
    await transporter.verify()
    console.log('✅ Email configuration is valid')
    return true
  } catch (error) {
    console.error('❌ Email configuration error:', error)
    return false
  }
}
