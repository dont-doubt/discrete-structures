import fonts from "@/utils/fonts";
import "./globals.css";
import { Children } from '@/utils/types';
import { Toaster } from "sonner";
import { Viewport } from "next";

export const metadata = {
  title: {
    absolute: '⇱ Дискретные структуры',
    template: "⇱ %s – Дискретные структуры",
  },
  description: 'Топ 12 самых необычных заданий, которые могут предложить Дискретные структуры',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({children}: Children) {
  return (
    <html lang="ru">
      <body className={fonts}>
        <Toaster position="top-center" theme="dark" richColors />
        {children}
      </body>
    </html>
  );
}
