"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import BannerSlider from "@/components/banner-slider"

export default function HomePage() {
  const categories = [
    { name: "Phones & Accessories", image: "/modern-communication-hub.png", href: "/category/phones-accessories" },
    { name: "TV & Accessories", image: "/vintage-television-living-room.png", href: "/category/tv-accessories" },
    { name: "Computers & Tablets", image: "/modern-workspace.png", href: "/category/computers-tablets" },
    { name: "Air Conditioning", image: "/window-unit-cooling.png", href: "/category/air-conditioning" },
    { name: "Home Appliances", image: "/modern-kitchen-essentials.png", href: "/category/home-appliances" },
    {
      name: "Kitchen Appliances",
      image: "/modern-kitchen-essentials.png",
      href: "/category/kitchen-appliances",
    },
    { name: "Gaming", image: "/modern-gaming-setup.png", href: "/category/gaming" },
    {
      name: "Super Cards",
      image: "/colorful-gift-cards.png",
      href: "/category/super-cards",
    },
  ]

  const banners = [
    {
      id: 1,
      image: "/banner-summer-sale.jpg",
      title: "Summer Sale",
      description: "Up to 50% off on selected items",
      buttonText: "Shop Now",
      href: "/category/phones-accessories",
    },
    {
      id: 2,
      image: "/banner-new-arrivals.jpg",
      title: "New Arrivals",
      description: "Check out the latest tech gadgets",
      buttonText: "Discover",
      href: "/category/computers-tablets",
    },
    {
      id: 3,
      image: "/banner-ac-sale.jpg",
      title: "Beat the Heat",
      description: "Special offers on air conditioners",
      buttonText: "Shop AC",
      href: "/category/air-conditioning",
    },
  ]

  const heroProducts = [
    {
      id: "1",
      name: 'TCL Smart TV 55" 4K UHD',
      price: 129.9,
      originalPrice: 149.9,
      image: "/smart-tv-living-room.png",
    },
    {
      id: "2",
      name: "SMEG Stand Mixer",
      price: 189.0,
      originalPrice: 199.0,
      image: "/retro-kitchen-prep.png",
    },
  ]

  const mobilePhones = [
    {
      id: "3",
      name: "Samsung Galaxy S23 Ultra",
      price: 379.9,
      originalPrice: 429.9,
      image: "/placeholder.svg?height=300&width=300&query=samsung galaxy s23 ultra",
    },
    {
      id: "4",
      name: "Samsung Galaxy Z Fold 5",
      price: 579.9,
      originalPrice: 629.9,
      image: "/placeholder.svg?height=300&width=300&query=samsung galaxy z fold",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Banner Slider */}
      <BannerSlider banners={banners} />

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4">
        {categories.map((category) => (
          <Link key={category.name} href={category.href} className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-24 sm:h-32">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
              </div>
              <div className="p-2 text-center">
                <h3 className="text-xs sm:text-sm font-medium">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Free Shipping Banner */}
      <div className="bg-cyan-600 text-white p-4 text-center my-4">
        <h2 className="text-lg font-bold">FREE SHIPPING</h2>
        <p className="text-sm">On orders over 20 KD</p>
      </div>

      {/* Deals Below 9.9 KD */}
      <div className="bg-cyan-700 text-white py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">DEALS BELOW 9.9 KD!</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[...Array(6)].map((_, i) => (
              <Link key={i} href={`/product/${i + 11}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-28 sm:h-32">
                    <Image
                      src={`/placeholder.svg?height=150&width=150&query=budget electronics item ${i + 1}`}
                      alt={`Budget Item ${i + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-xs font-medium text-gray-800 line-clamp-2">Budget Electronics Item {i + 1}</h3>
                    <p className="text-xs text-gray-500">Electronics</p>
                    <p className="text-sm font-bold text-gray-800 mt-1">9.{i}00 KD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Deals Below 49.9 KD */}
      <div className="bg-cyan-700 text-white py-4 mt-4">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">DEALS BELOW 49.9 KD!</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[...Array(6)].map((_, i) => (
              <Link key={i} href={`/product/${i + 17}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-28 sm:h-32">
                    <Image
                      src={`/placeholder.svg?height=150&width=150&query=mid-range electronics item ${i + 1}`}
                      alt={`Mid-range Item ${i + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
                      Mid-range Electronics Item {i + 1}
                    </h3>
                    <p className="text-xs text-gray-500">Electronics</p>
                    <p className="text-sm font-bold text-gray-800 mt-1">39.{i}00 KD</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Picks */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Hero Picks</h2>
        <div className="grid grid-cols-2 gap-4">
          {heroProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="relative h-40 mb-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <p className="font-bold text-sm">{product.price.toFixed(3)} KD</p>
                      {product.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through ml-2">
                          {product.originalPrice.toFixed(3)} KD
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Phones */}
      <div className="container mx-auto px-4 py-4">
        <h2 className="text-xl font-bold mb-4">Mobile Phones</h2>
        <div className="grid grid-cols-2 gap-4">
          {mobilePhones.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                <CardContent className="p-3">
                  <div className="relative h-40 mb-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      <p className="font-bold text-sm">{product.price.toFixed(3)} KD</p>
                      {product.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through ml-2">
                          {product.originalPrice.toFixed(3)} KD
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
