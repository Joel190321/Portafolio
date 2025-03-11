import { Inter } from "next/font/google"
import { ThemeProvider } from "./components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Joel David Peña | Desarrollador Web",
  description:
    "Portfolio profesional de Joel David Peña, desarrollador web especializado en JavaScript, React, Next.js y más.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

