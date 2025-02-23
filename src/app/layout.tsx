import fonts from "@/utils/fonts";
import "./globals.css";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={fonts}>
        {children}
      </body>
    </html>
  );
}
