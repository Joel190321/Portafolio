import  React from "react"



export const EmailTemplate = ({ name, email, subject, message }) => (
  <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
    <div
      style={{
        backgroundColor: "#4F46E5",
        color: "white",
        padding: "20px",
        textAlign: "center",
        borderTopLeftRadius: "8px",
        borderTopRightRadius: "8px",
      }}
    >
      <h1 style={{ margin: "0", fontSize: "24px" }}>Nuevo Mensaje de Contacto</h1>
    </div>

    <div
      style={{
        backgroundColor: "#f9fafb",
        padding: "20px 30px",
        borderBottomLeftRadius: "8px",
        borderBottomRightRadius: "8px",
        border: "1px solid #e5e7eb",
        borderTop: "none",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #e5e7eb",
                fontWeight: "bold",
                width: "120px",
                verticalAlign: "top",
              }}
            >
              Nombre:
            </td>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {name}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #e5e7eb",
                fontWeight: "bold",
                verticalAlign: "top",
              }}
            >
              Email:
            </td>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <a href={`mailto:${email}`} style={{ color: "#4F46E5", textDecoration: "none" }}>
                {email}
              </a>
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #e5e7eb",
                fontWeight: "bold",
                verticalAlign: "top",
              }}
            >
              Asunto:
            </td>
            <td
              style={{
                padding: "12px 0",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {subject}
            </td>
          </tr>
          <tr>
            <td
              style={{
                padding: "12px 0",
                fontWeight: "bold",
                verticalAlign: "top",
              }}
            >
              Mensaje:
            </td>
            <td
              style={{
                padding: "12px 0",
                whiteSpace: "pre-wrap",
              }}
            >
              {message}
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f3f4f6",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#6b7280",
          textAlign: "center",
        }}
      >
        Este mensaje fue enviado desde el formulario de contacto de tu sitio web.
      </div>
    </div>

    <div
      style={{
        textAlign: "center",
        padding: "20px",
        color: "#6b7280",
        fontSize: "12px",
      }}
    >
      © {new Date().getFullYear()} Joel David Peña. Todos los derechos reservados.
    </div>
  </div>
)

