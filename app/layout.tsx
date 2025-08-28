import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WarmCall - 暖心來電 | 溫暖陪伴服務",
  description: "提供溫暖的電話陪伴服務，為您帶來情感支持與關懷。專業、貼心、隨時陪伴您度過每一個需要溫暖的時刻。",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon-48x48.png',
  },
  keywords: ['暖心來電', 'WarmCall', '電話陪伴', '情感支持', '溫暖服務', '心理支持'],
  authors: [{ name: 'WarmCall Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#fb923c',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
