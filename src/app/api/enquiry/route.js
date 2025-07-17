export async function POST(req) {
  try {
    // Parse request body
    const body = await req.json();
    console.log("Received data:", body);

    const { name, email, phone, property, location, date, time } = body;

    // ✅ Validation with detailed error messages
    const errors = [];

    if (!name || name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long");
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.push("Valid email address is required");
    }

    if (!phone || !/^\+?254\d{9}$/.test(phone)) {
      errors.push(
        "Valid Kenyan phone number is required (e.g., +254712345678)"
      );
    }

    if (!property || property.trim().length === 0) {
      errors.push("Property name is required");
    }

    if (!location || location.trim().length === 0) {
      errors.push("Location is required");
    }

    if (!date || date.trim().length === 0) {
      errors.push("Date is required");
    }

    if (!time || time.trim().length === 0) {
      errors.push("Time is required");
    }

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({
          message: "Validation failed",
          errors: errors,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Check for required environment variables
    if (!process.env.BREVO_API_KEY) {
      console.error("BREVO_API_KEY is not set");
      return new Response(
        JSON.stringify({ message: "Server configuration error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!process.env.BREVO_SENDER_EMAIL || !process.env.ADMIN_EMAIL) {
      console.error("Email configuration missing");
      return new Response(
        JSON.stringify({ message: "Email configuration error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Send email via Brevo
    const emailPayload = {
      sender: {
        name: process.env.BREVO_SENDER_NAME || "Viewing Scheduler",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [
        {
          email: process.env.ADMIN_EMAIL,
          name: "Admin",
        },
      ],
      subject: `🏠 Viewing Request: ${property} at ${location}`,
      htmlContent: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Viewing Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f6f8; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; color: white;">
            <div style="background-color: rgba(255, 255, 255, 0.1); border-radius: 50px; display: inline-block; padding: 15px; margin-bottom: 15px;">
                <div style="font-size: 32px;">🏠</div>
            </div>
            <h1 style="margin: 0 0 10px 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">PRESTIGE PROPERTIES</h1>
            <p style="margin: 0; font-size: 16px; opacity: 0.9; letter-spacing: 0.5px;">Property Viewing Request</p>
        </div>

        <!-- Alert Banner -->
        <div style="background: linear-gradient(90deg, #ff6b6b, #ffa726); padding: 15px 20px; text-align: center;">
            <p style="margin: 0; color: white; font-weight: 600; font-size: 14px;">
                ⚡ NEW VIEWING REQUEST RECEIVED ⚡
            </p>
        </div>

        <!-- Content Section -->
        <div style="padding: 30px 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 24px; font-weight: 600;">New Viewing Appointment</h2>
                <p style="margin: 0; color: #7f8c8d; font-size: 16px;">A potential client has requested to view a property</p>
            </div>

            <!-- Property Details Card -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 20px; margin-bottom: 25px; color: white;">
                <div style="text-align: center; margin-bottom: 15px;">
                    <div style="font-size: 24px; margin-bottom: 8px;">🏘️</div>
                    <h3 style="margin: 0; font-size: 20px; font-weight: 600;">Property Information</h3>
                </div>
                <div style="background: rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 15px;">
                    <p style="margin: 0 0 8px 0; font-size: 16px;"><strong>Property:</strong> ${property}</p>
                    <p style="margin: 0; font-size: 16px;"><strong>Location:</strong> ${location}</p>
                </div>
            </div>

            <!-- Client Information -->
            <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                <div style="text-align: center; margin-bottom: 15px;">
                    <div style="font-size: 24px; margin-bottom: 8px;">👤</div>
                    <h3 style="margin: 0; color: #2c3e50; font-size: 20px; font-weight: 600;">Client Details</h3>
                </div>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057; width: 30%;">
                            <div style="display: flex; align-items: center;">
                                <span style="margin-right: 8px;">👤</span>
                                Name:
                            </div>
                        </td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #2c3e50; font-weight: 500;">
                            ${name}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; font-weight: 600; color: #495057;">
                            <div style="display: flex; align-items: center;">
                                <span style="margin-right: 8px;">📧</span>
                                Email:
                            </div>
                        </td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #2c3e50; font-weight: 500;">
                            <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 12px 0; font-weight: 600; color: #495057;">
                            <div style="display: flex; align-items: center;">
                                <span style="margin-right: 8px;">📱</span>
                                Phone:
                            </div>
                        </td>
                        <td style="padding: 12px 0; color: #2c3e50; font-weight: 500;">
                            <a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- Appointment Details -->
            <div style="background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); border-radius: 12px; padding: 20px; margin-bottom: 25px; color: #2c3e50;">
                <div style="text-align: center; margin-bottom: 15px;">
                    <div style="font-size: 24px; margin-bottom: 8px;">📅</div>
                    <h3 style="margin: 0; font-size: 20px; font-weight: 600;">Appointment Details</h3>
                </div>
                <div style="background: rgba(255, 255, 255, 0.3); border-radius: 8px; padding: 15px; text-align: center;">
                    <div style="display: flex; justify-content: space-around; align-items: center; flex-wrap: wrap;">
                        <div style="margin: 5px;">
                            <div style="font-size: 18px; margin-bottom: 5px;">📅</div>
                            <strong>Date:</strong><br/>
                            <span style="font-size: 16px; font-weight: 600;">${date}</span>
                        </div>
                        <div style="margin: 5px;">
                            <div style="font-size: 18px; margin-bottom: 5px;">⏰</div>
                            <strong>Time:</strong><br/>
                            <span style="font-size: 16px; font-weight: 600;">${time}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; margin: 30px 0;">
                <div style="margin-bottom: 15px;">
                    <a href="mailto:${email}?subject=Re: Property Viewing Request - ${property}" 
                       style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                              color: white; 
                              padding: 15px 30px; 
                              text-decoration: none; 
                              border-radius: 25px; 
                              font-weight: 600; 
                              font-size: 16px; 
                              display: inline-block; 
                              margin: 0 10px 10px 0; 
                              transition: all 0.3s ease;
                              box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                        📧 Reply to Client
                    </a>
                </div>
                <div>
                    <a href="tel:${phone}" 
                       style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); 
                              color: white; 
                              padding: 15px 30px; 
                              text-decoration: none; 
                              border-radius: 25px; 
                              font-weight: 600; 
                              font-size: 16px; 
                              display: inline-block; 
                              margin: 0 10px 10px 0;
                              box-shadow: 0 4px 12px rgba(17, 153, 142, 0.3);">
                        📞 Call Client
                    </a>
                </div>
            </div>

            <!-- Note Section -->
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px; margin-top: 20px;">
                <p style="margin: 0; color: #856404; font-size: 14px; font-weight: 500;">
                    <strong>⚠️ Important:</strong> Please respond to this viewing request within 24 hours to maintain excellent customer service standards.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: #2c3e50; color: white; padding: 20px; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">PRESTIGE PROPERTIES</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.8;">
                Your Dream Home Awaits • 
                <a href="https://prestigeproperties.com" style="color: #84fab0; text-decoration: none;">prestigeproperties.com</a>
            </p>
            <div style="margin-top: 15px; font-size: 12px; opacity: 0.6;">
                <p style="margin: 0;">This email was automatically generated from your website contact form.</p>
            </div>
        </div>
    </div>
</body>
</html>
      `,
    };

    console.log("Sending email with payload:", emailPayload);

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Brevo API error:", result);
      return new Response(
        JSON.stringify({
          message: "Failed to send email",
          error: result.message || "Unknown error",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("Email sent successfully:", result);

    return new Response(
      JSON.stringify({
        message: "Viewing scheduled successfully",
        emailId: result.messageId,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({
        message: "Internal server error",
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
