import { NextResponse } from "next/server"
import { Resend } from "resend"
import { generateEmailHTML } from "../../utils/email-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 })
    }

    const html = generateEmailHTML({ name, email, subject, message,  })

    const data = await resend.emails.send({
      from: "Formulario de Contacto <onboarding@resend.dev>",
      to: "ype0111@gmail.com", 
      subject: `Nuevo mensaje: ${subject}`,
      reply_to: email,
      html: html,
      text: `
         ${name}
         ${email}
         ${subject}
         ${message}
      `,
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Error al enviar el mensaje" }, { status: 500 })
  }
}

