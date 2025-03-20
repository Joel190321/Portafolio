"use server"

import { Resend } from "resend"
import  generateEmailHTML  from "../utils/email-template"


const resend = new Resend(process.env.RESEND_API_KEY)

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const { name, email, subject, message } = formData

  
    if (!name || !email || !subject || !message) {
      return {
        success: false,
        message: "Todos los campos son requeridos",
      }
    }

   
    const html = generateEmailHTML({ name, email, subject, message })

    const data = await resend.emails.send({
      from: "Formulario de Contacto <onboarding@resend.dev>", 
      to: "ype0111@gmail.com", 
      subject: `Nuevo mensaje: ${subject}`,
      html: html,
      
      text: `
        Nombre: ${name}
        Email: ${email}
        Asunto: ${subject}
        Mensaje: ${message}
      `,
    })

    return {
      success: true,
      message: "Mensaje enviado correctamente",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: "Error al enviar el mensaje",
    }
  }
}

