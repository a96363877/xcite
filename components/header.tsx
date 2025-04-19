"use client"

import Link from "next/link"
import { Search, ShoppingCart, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcher from "@/components/language-switcher"
import Image from "next/image"

export default function Header() {
  const { cartItems } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { t, dir } = useLanguage()

  const categories = [
    { name: t("Phones & Accessories"), href: "/category/phones-accessories" },
    { name: t("TV & Accessories"), href: "/category/tv-accessories" },
    { name: t("Computers & Tablets"), href: "/category/computers-tablets" },
    { name: t("Air Conditioning"), href: "/category/air-conditioning" },
    { name: t("Home Appliances"), href: "/category/home-appliances" },
    { name: t("Kitchen Appliances"), href: "/category/kitchen-appliances" },
    { name: t("Gaming"), href: "/category/gaming" },
    { name: t("Super Cards"), href: "/category/super-cards" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#00355F] text-white">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t("Toggle menu")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side={dir === "rtl" ? "right" : "left"} className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-lg font-medium transition-colors hover:text-cyan-600"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image  src="/logo.svg" alt="" width={70} height={70}/>
        </Link>

        <div className="hidden md:flex md:gap-6 md:items-center">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="text-sm font-medium transition-colors hover:text-cyan-600"
            >
              {category.name}
            </Link>
          ))}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                {t("More")}
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-screen">
              <nav className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
                {categories.slice(4).map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="text-sm font-medium transition-colors hover:text-cyan-600"
                  >
                    {category.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className={cn("ml-auto flex items-center gap-2", isSearchOpen ? "hidden md:flex" : "flex")}>
          <div className="hidden md:flex relative">
            <Input type="search" placeholder={t("Search...")} className="w-[200px] lg:w-[300px]" />
            <Button variant="ghost" size="icon" className="absolute right-0">
              <Search className="h-4 w-4" />
              <span className="sr-only">{t("Search")}</span>
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">{t("Search")}</span>
          </Button>

          <LanguageSwitcher />

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">{t("Account")}</span>
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
              <span className="sr-only">{t("Cart")}</span>
            </Button>
          </Link>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t md:hidden p-2">
          <div className="relative">
            <Input type="search" placeholder={t("Search...")} className="w-full" />
            <Button variant="ghost" size="icon" className="absolute right-0 top-0">
              <Search className="h-4 w-4" />
              <span className="sr-only">{t("Search")}</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
