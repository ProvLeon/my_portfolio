// app/api/send-email/route.ts
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import process from "node:process";

// Rate limiting setup
const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW = 4 * 60 * 1000; // 4 minutes
const MAX_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  // console.log("windowStart", windowStart);

  // Clean up old entries
  rateLimit.forEach((timestamp, key) => {
    if (timestamp < windowStart) rateLimit.delete(key);
  });

  // Check current IP
  const requestCount = rateLimit.get(ip) || 0;
  if (requestCount >= MAX_REQUESTS) return false;

  rateLimit.set(ip, requestCount + 1);
  return true;
}

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";

    // Rate limiting check
    if (!checkRateLimit(clientIp)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    // Validation
    if (!name || !email || !message) {
      return Response.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const currentDate = new Date().toLocaleString();

    // Email options with enhanced HTML template
    const mailOptions: Mail.Options = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || "your-email@example.com",
      replyTo: email,
      subject: `✨ New Portfolio Contact from ${name}`,
      html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Contact Form Submission</title>
              </head>
              <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin: 0; padding: 20px;">
                  <tr>
                    <td align="center">
                      <table width="100%" style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <!-- Header -->
                        <tr>
                          <td style="padding: 30px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">New Portfolio Message</h1>
                            <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">You've received a new contact form submission</p>
                          </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                          <td style="padding: 40px;">
                            <!-- Sender Info -->
                            <table width="100%" style="margin-bottom: 30px;">
                              <tr>
                                <td>
                                  <h2 style="margin: 0 0 20px; color: #333; font-size: 20px;">Sender Information</h2>
                                  <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px;">
                                    <p style="margin: 0 0 15px;">
                                      <strong style="color: #555;">Name:</strong>
                                      <span style="color: #333; margin-left: 8px;">${name}</span>
                                    </p>
                                    <p style="margin: 0;">
                                      <strong style="color: #555;">Email:</strong>
                                      <span style="color: #333; margin-left: 8px;">${email}</span>
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </table>

                            <!-- Message -->
                            <table width="100%">
                              <tr>
                                <td>
                                  <h2 style="margin: 0 0 20px; color: #333; font-size: 20px;">Message</h2>
                                  <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px;">
                                    <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                          <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0; color: #666; font-size: 14px;">
                              📅 Received on: ${currentDate}
                            </p>
                            <p style="margin: 10px 0 0; color: #666; font-size: 14px;">
                              This is an automated message from your portfolio contact form.
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- Additional Info -->
                      <table width="100%" style="max-width: 600px; margin: 20px auto 0;">
                        <tr>
                          <td style="padding: 20px; text-align: center;">
                            <p style="margin: 0; color: #666; font-size: 14px;">
                              To reply to this message, simply respond to this email or click the sender's email address above.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>
          `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return Response.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email error:", error);
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
