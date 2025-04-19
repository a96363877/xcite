import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans, Noto_Sans_Arabic } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/components/cart-provider"
import NavigationProgress from "@/components/navigation-progress"
import LoadingOverlay from "@/components/loading-overlay"
import { LanguageProvider } from "@/components/language-provider"

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-arabic",
})

export const metadata: Metadata = {
  title: "Xcite - Electronics & Home Appliances",
  description: "Shop the latest electronics, home appliances, and more",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} ${notoSansArabic.variable} bg-gray-50 font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>
            <CartProvider>
              <NavigationProgress />
              <LoadingOverlay />
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
