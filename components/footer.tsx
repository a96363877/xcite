"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-cyan-600">Xcite</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("Your one-stop shop for electronics, home appliances, and more.")}
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium">{t("Shop")}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/category/phones-accessories" className="text-muted-foreground hover:text-foreground">
                  {t("Phones & Accessories")}
                </Link>
              </li>
              <li>
                <Link href="/category/tv-accessories" className="text-muted-foreground hover:text-foreground">
                  {t("TV & Accessories")}
                </Link>
              </li>
              <li>
                <Link href="/category/computers-tablets" className="text-muted-foreground hover:text-foreground">
                  {t("Computers & Tablets")}
                </Link>
              </li>
              <li>
                <Link href="/category/air-conditioning" className="text-muted-foreground hover:text-foreground">
                  {t("Air Conditioning")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium">{t("Account")}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/account" className="text-muted-foreground hover:text-foreground">
                  {t("My Account")}
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-muted-foreground hover:text-foreground">
                  {t("Order History")}
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="text-muted-foreground hover:text-foreground">
                  {t("Wishlist")}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                  {t("Returns")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium">{t("Customer Service")}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  {t("Contact Us")}
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                  {t("Shipping Policy")}
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                  {t("Returns Policy")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                  {t("FAQ")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium">{t("Legal")}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  {t("Terms of Service")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  {t("Privacy Policy")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                  {t("Cookie Policy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Xcite. {t("All rights reserved.")}
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <img src="/stylized-payment-card.png" alt="Visa" className="h-6" />
            <img src="/interlocking-circles.png" alt="Mastercard" className="h-6" />
            <img src="/american-express-card.png" alt="American Express" className="h-6" />
            <img src="/paypal-logo-closeup.png" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  )
}
