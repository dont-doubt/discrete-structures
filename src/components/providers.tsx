'use client'

import { Children } from "@/utils/types";
import { ThemeProvider as NextThemeProvider } from 'next-themes';

function ThemeProvider({children}: Children) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  )
}

export default function Providers({children}: Children) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
