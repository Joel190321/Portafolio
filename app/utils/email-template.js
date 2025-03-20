export default function generateEmailHTML(data) {
    const { name, email, subject, message } = data;
  
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nuevo mensaje de contacto</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9fafb;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <div style="background-color: #4F46E5; color: white; padding: 20px; text-align: center; border-top-left-radius: 8px; border-top-right-radius: 8px;">
              <h1 style="margin: 0; font-size: 24px;">Nuevo Mensaje de Contacto</h1>
            </div>
            
            <div style="background-color: #f9fafb; padding: 20px 30px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; border: 1px solid #e5e7eb; border-top: none;">
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 120px; vertical-align: top;">
                      Nombre:
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                      ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; vertical-align: top;">
                      Email:
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                      <a href="mailto:${email}" style="color: #4F46E5; text-decoration: none;">
                        ${email}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; vertical-align: top;">
                      Asunto:
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                      ${subject}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; font-weight: bold; vertical-align: top;">
                      Mensaje:
                    </td>
                    <td style="padding: 12px 0; white-space: pre-wrap;">
                      ${message}
                    </td>
                  </tr>
                </tbody>
              </table>
              
              <div style="margin-top: 30px; padding: 15px; background-color: #f3f4f6; border-radius: 6px; font-size: 14px; color: #6b7280; text-align: center;">
                Este mensaje fue enviado desde el formulario de contacto de tu sitio web.
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
              © ${new Date().getFullYear()} Joel David Peña. Todos los derechos reservados.
            </div>
          </div>
        </body>
      </html>
    `;
  }