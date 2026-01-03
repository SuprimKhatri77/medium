export const getMagicLinkEmail = (magicLinkUrl: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); min-height: 100vh;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          
          <!-- Header with Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 48px 40px; text-align: center;">
              <div style="display: inline-block; padding: 12px; background-color: rgba(255,255,255,0.1); border-radius: 12px; margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                </svg>
              </div>
              <h1 style="margin: 0 0 8px 0; font-size: 32px; font-weight: 700; color: #ffffff; line-height: 1.2;">Secure Sign In</h1>
              <p style="margin: 0; font-size: 14px; color: #d1d5db; font-weight: 400;">Your one-time authentication link is ready</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 48px 40px;">
              
              <!-- Welcome Text -->
              <div style="text-align: center; margin-bottom: 32px;">
                <p style="margin: 0 0 12px 0; font-size: 18px; color: #1f2937; line-height: 1.6; font-weight: 500;">
                  Welcome back! Click the button below to securely access your account.
                </p>
                <p style="margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5;">
                  This magic link will expire in <span style="font-weight: 600; color: #1f2937;">5 minutes</span> for your security.
                </p>
              </div>

              <!-- CTA Button -->
              <div style="text-align: center; margin-bottom: 32px;">
                <a href="${magicLinkUrl}" style="display: inline-block; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px; padding: 16px 48px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transition: all 0.3s;">
                  Sign In to Dashboard →
                </a>
              </div>

              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right: 12px; vertical-align: top;">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="#3b82f6">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                          </svg>
                        </td>
                        <td>
                          <h3 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 600; color: #1e3a8a;">Security Tip</h3>
                          <p style="margin: 0; font-size: 14px; color: #1e40af; line-height: 1.5;">
                            This link can only be used once. Never share this email with anyone.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Alternative Link Section -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 12px 0; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em;">
                      Having trouble with the button?
                    </p>
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #4b5563;">
                      Copy and paste this link into your browser:
                    </p>
                    <div style="background-color: #ffffff; border: 1px solid #d1d5db; border-radius: 8px; padding: 12px; word-break: break-all;">
                      <a href="${magicLinkUrl}" style="font-size: 13px; color: #2563eb; text-decoration: none;">
                        ${magicLinkUrl}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 32px 40px; border-top: 1px solid #e5e7eb; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #4b5563;">
                Didn't request this email? You can safely ignore it.
              </p>
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                This is an automated message, please do not reply.
              </p>
            </td>
          </tr>

        </table>

        <!-- Bottom Text -->
        <p style="margin: 32px 0 0 0; font-size: 12px; color: #6b7280; text-align: center;">
          © ${new Date().getFullYear()} Medium. All rights reserved.
        </p>

      </td>
    </tr>
  </table>
</body>
</html>
`
