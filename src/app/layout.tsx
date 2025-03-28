import fonts from "@/utils/fonts";
import "./globals.css";
import { Children } from '@/utils/types';

export const metadata = {
  title: {
    absolute: '⇱ Дискретные структуры',
    template: "⇱ %s – Дискретные структуры",
  },
};

export default function RootLayout({children}: Children) {
  return (
    <html lang="ru">
      <body className={fonts}>
        {children}
      </body>
    </html>
  );
}
