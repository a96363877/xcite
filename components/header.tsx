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
  const { t, dir, language } = useLanguage()

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
    <header className="sticky top-0 z-50 w-full bg-[#003366] text-white">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
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
                  className="text-lg font-medium transition-colors hover:text-cyan-300"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className={cn("flex items-center gap-2", isSearchOpen ? "hidden md:flex" : "flex")}>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative text-white">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
              <span className="sr-only">{t("Cart")}</span>
            </Button>
          </Link>

          <Button variant="ghost" size="icon" className="text-white">
            <User className="h-5 w-5" />
            <span className="sr-only">{t("Account")}</span>
          </Button>

          <div className="hidden md:flex relative w-[200px] lg:w-[300px]">
            <Input
              type="search"
              placeholder={language === "ar" ? "البحث في إكسايت" : "Search in Xcite"}
              className="bg-white text-black rounded-sm"
            />
            <Button variant="ghost" size="icon" className="absolute right-0 text-gray-500">
              <Search className="h-4 w-4" />
              <span className="sr-only">{t("Search")}</span>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">{t("Search")}</span>
          </Button>
        </div>

        <div className="mx-auto flex-1 flex justify-center md:justify-end">
          <Link href="/" className="flex items-center">
            {language === "ar" ? (
            <Image src="/next.svg" alt="" width={70} height={70}/>
            ) : (
              <Image src="/logo.svg" alt="" width={70} height={70}/>
              )}
          </Link>
        </div>

        <div className="hidden md:flex md:gap-6 md:items-center">
          <LanguageSwitcher />
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t border-blue-800 md:hidden p-2 bg-[#003366]">
          <div className="relative">
            <Input
              type="search"
              placeholder={language === "ar" ? "البحث في إكسايت" : "Search in Xcite"}
              className="w-full bg-white text-black rounded-sm"
            />
            <Button variant="ghost" size="icon" className="absolute right-0 top-0 text-gray-500">
              <Search className="h-4 w-4" />
              <span className="sr-only">{t("Search")}</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
