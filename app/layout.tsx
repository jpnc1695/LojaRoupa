'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { Box } from '@mui/material';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultTheme = createTheme();

// Metadata não pode ser exportado de um Client Component.
// Se precisar de metadados, mova-os para um Server Component separado.
// Por enquanto, removemos ou mantemos apenas como exemplo (não terá efeito).
// export const metadata: Metadata = { ... };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <CssBaseline />
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
      </body>
    </html>
  );
}