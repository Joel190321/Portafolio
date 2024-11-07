'use client';

import './globals.css';
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Configura ThemeProvider */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system" // Usa el tema predeterminado del sistema
          enableSystem // Habilita el soporte para el tema del sistema
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
