"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for categories
const categoryData: Record<string, { title: string; products: any[] }> = {
  "phones-accessories": {
    title: "Phones & Accessories",
    products: [
      {
        id: "1",
        name: "Samsung Galaxy S23 Ultra",
        price: 379.9,
        originalPrice: 429.9,
        image: "/phantom-black-s23-ultra.png",
        brand: "Samsung",
        category: "Smartphones",
      },
      {
        id: "2",
        name: "Samsung Galaxy Z Fold 5",
        price: 579.9,
        originalPrice: 629.9,
        image: "/folded-galaxy-display.png",
        brand: "Samsung",
        category: "Smartphones",
      },
      {
        id: "3",
        name: "iPhone 15 Pro Max",
        price: 429.9,
        originalPrice: 459.9,
        image: "/placeholder.svg?height=300&width=300&query=iphone 15 pro max",
        brand: "Apple",
        category: "Smartphones",
      },
      {
        id: "4",
        name: "Google Pixel 8 Pro",
        price: 349.9,
        originalPrice: 379.9,
        image: "/placeholder.svg?height=300&width=300&query=google pixel 8 pro",
        brand: "Google",
        category: "Smartphones",
      },
      {
        id: "5",
        name: "Samsung Galaxy Watch 6",
        price: 89.9,
        originalPrice: 99.9,
        image: "/placeholder.svg?height=300&width=300&query=samsung galaxy watch 6",
        brand: "Samsung",
        category: "Smartwatches",
      },
      {
        id: "6",
        name: "Apple Watch Series 9",
        price: 119.9,
        originalPrice: 129.9,
        image: "/placeholder.svg?height=300&width=300&query=apple watch series 9",
        brand: "Apple",
        category: "Smartwatches",
      },
      {
        id: "7",
        name: "AirPods Pro 2",
        price: 79.9,
        originalPrice: 89.9,
        image: "/placeholder.svg?height=300&width=300&query=airpods pro 2",
        brand: "Apple",
        category: "Earbuds",
      },
      {
        id: "8",
        name: "Samsung Galaxy Buds 3",
        price: 59.9,
        originalPrice: 69.9,
        image: "/placeholder.svg?height=300&width=300&query=samsung galaxy buds",
        brand: "Samsung",
        category: "Earbuds",
      },
    ],
  },
  "tv-accessories": {
    title: "TV & Accessories",
    products: [
      {
        id: "9",
        name: 'TCL 65" 4K Smart TV',
        price: 199.9,
        originalPrice: 249.9,
        image: "/placeholder.svg?height=300&width=300&query=tcl 65 inch 4k tv",
        brand: "TCL",
        category: "Smart TVs",
      },
      {
        id: "10",
        name: 'Samsung 55" QLED 4K TV',
        price: 299.9,
        originalPrice: 349.9,
        image: "/placeholder.svg?height=300&width=300&query=samsung qled tv",
        brand: "Samsung",
        category: "Smart TVs",
      },
      {
        id: "11",
        name: 'LG 75" OLED 4K TV',
        price: 599.9,
        originalPrice: 699.9,
        image: "/placeholder.svg?height=300&width=300&query=lg oled tv",
        brand: "LG",
        category: "Smart TVs",
      },
      {
        id: "12",
        name: "Sonos Beam Soundbar",
        price: 129.9,
        originalPrice: 149.9,
        image: "/placeholder.svg?height=300&width=300&query=sonos beam soundbar",
        brand: "Sonos",
        category: "Soundbars",
      },
      {
        id: "13",
        name: "Samsung HW-Q800C Soundbar",
        price: 149.9,
        originalPrice: 179.9,
        image: "/placeholder.svg?height=300&width=300&query=samsung soundbar",
        brand: "Samsung",
        category: "Soundbars",
      },
      {
        id: "14",
        name: "Apple TV 4K",
        price: 59.9,
        originalPrice: 69.9,
        image: "/placeholder.svg?height=300&width=300&query=apple tv 4k",
        brand: "Apple",
        category: "Streaming Devices",
      },
      {
        id: "15",
        name: "Roku Ultra",
        price: 39.9,
        originalPrice: 49.9,
        image: "/placeholder.svg?height=300&width=300&query=roku ultra",
        brand: "Roku",
        category: "Streaming Devices",
      },
      {
        id: "16",
        name: "HDMI 2.1 Cable 3m",
        price: 9.9,
        originalPrice: 14.9,
        image: "/placeholder.svg?height=300&width=300&query=hdmi cable",
        brand: "Belkin",
        category: "Cables",
      },
    ],
  },
  "computers-tablets": {
    title: "Computers & Tablets",
    products: [
      {
        id: "17",
        name: "Apple MacBook Air M2",
        price: 499.9,
        originalPrice: 549.9,
        image: "/sleek-m2-on-desk.png",
        brand: "Apple",
        category: "Laptops",
      },
      {
        id: "18",
        name: "Lenovo Yoga Slim 7",
        price: 299.9,
        originalPrice: 349.9,
        image: "/yoga-lifestyle.png",
        brand: "Lenovo",
        category: "Laptops",
      },
      {
        id: "19",
        name: "Dell XPS 13",
        price: 399.9,
        originalPrice: 449.9,
        image: "/placeholder.svg?height=300&width=300&query=dell xps 13",
        brand: "Dell",
        category: "Laptops",
      },
      {
        id: "20",
        name: "iPad Pro 12.9",
        price: 349.9,
        originalPrice: 399.9,
        image: "/placeholder.svg?height=300&width=300&query=ipad pro",
        brand: "Apple",
        category: "Tablets",
      },
      {
        id: "21",
        name: "Samsung Galaxy Tab S9",
        price: 299.9,
        originalPrice: 329.9,
        image: "/placeholder.svg?height=300&width=300&query=samsung galaxy tab",
        brand: "Samsung",
        category: "Tablets",
      },
      {
        id: "22",
        name: "Microsoft Surface Pro 9",
        price: 399.9,
        originalPrice: 449.9,
        image: "/placeholder.svg?height=300&width=300&query=microsoft surface pro",
        brand: "Microsoft",
        category: "Tablets",
      },
      {
        id: "23",
        name: "HP Pavilion Desktop",
        price: 249.9,
        originalPrice: 299.9,
        image: "/placeholder.svg?height=300&width=300&query=hp desktop computer",
        brand: "HP",
        category: "Desktops",
      },
      {
        id: "24",
        name: "Apple Mac Mini M2",
        price: 299.9,
        originalPrice: 349.9,
        image: "/placeholder.svg?height=300&width=300&query=mac mini",
        brand: "Apple",
        category: "Desktops",
      },
    ],
  },
  "air-conditioning": {
    title: "Air Conditioning",
    products: [
      {
        id: "25",
        name: "Wansa Diamond 18000 BTU Split AC",
        price: 89.9,
        originalPrice: 109.9,
        image: "/modern-living-cooling.png",
        brand: "Wansa",
        category: "Split AC",
      },
      {
        id: "26",
        name: "Wansa Gold 24000 BTU Split AC",
        price: 129.9,
        originalPrice: 149.9,
        image: "/placeholder.svg?height=300&width=300&query=wansa gold air conditioner",
        brand: "Wansa",
        category: "Split AC",
      },
      {
        id: "27",
        name: "Samsung Wind-Free 12000 BTU",
        price: 149.9,
        originalPrice: 179.9,
        image: "/placeholder.svg?height=300&width=300&query=samsung air conditioner",
        brand: "Samsung",
        category: "Split AC",
      },
      {
        id: "28",
        name: "LG Dual Inverter 18000 BTU",
        price: 159.9,
        originalPrice: 189.9,
        image: "/placeholder.svg?height=300&width=300&query=lg air conditioner",
        brand: "LG",
        category: "Split AC",
      },
      {
        id: "29",
        name: "Portable AC 12000 BTU",
        price: 79.9,
        originalPrice: 99.9,
        image: "/placeholder.svg?height=300&width=300&query=portable air conditioner",
        brand: "Midea",
        category: "Portable AC",
      },
      {
        id: "30",
        name: "Window AC 18000 BTU",
        price: 69.9,
        originalPrice: 89.9,
        image: "/placeholder.svg?height=300&width=300&query=window air conditioner",
        brand: "Carrier",
        category: "Window AC",
      },
      {
        id: "31",
        name: "AC Installation Kit",
        price: 19.9,
        originalPrice: 29.9,
        image: "/placeholder.svg?height=300&width=300&query=air conditioner installation kit",
        brand: "Generic",
        category: "Accessories",
      },
      {
        id: "32",
        name: "AC Remote Control Universal",
        price: 4.9,
        originalPrice: 7.9,
        image: "/placeholder.svg?height=300&width=300&query=universal ac remote",
        brand: "Generic",
        category: "Accessories",
      },
    ],
  },
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const category = categoryData[slug] || { title: "Category Not Found", products: [] }
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 1000])

  // Get unique brands for filtering
  const brands = Array.from(new Set(category.products.map((product) => product.brand)))
  const subcategories = Array.from(new Set(category.products.map((product) => product.category)))

  // Sort products based on selection
  const sortedProducts = [...category.products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "newest") return 0 // In a real app, would sort by date
    return 0 // Default: featured
  })

  return (
    <div className="container py-6">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium">{category.title}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{category.title}</h1>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between">
                    <span>{priceRange[0].toFixed(3)} KD</span>
                    <span>{priceRange[1].toFixed(3)} KD</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Brand</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={`brand-${brand}`} />
                        <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {subcategories.map((subcat) => (
                      <div key={subcat} className="flex items-center space-x-2">
                        <Checkbox id={`category-${subcat}`} />
                        <Label htmlFor={`category-${subcat}`}>{subcat}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Rating</h3>
                  <RadioGroup defaultValue="all">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="rating-all" />
                      <Label htmlFor="rating-all">All Ratings</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4plus" id="rating-4plus" />
                      <Label htmlFor="rating-4plus">4★ & Above</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3plus" id="rating-3plus" />
                      <Label htmlFor="rating-3plus">3★ & Above</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button className="flex-1">Apply Filters</Button>
                <Button variant="outline" className="flex-1">
                  Reset
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters - Desktop */}
        <div className="hidden lg:block space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3 flex items-center">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>{priceRange[0].toFixed(3)} KD</span>
                  <span>{priceRange[1].toFixed(3)} KD</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox id={`desktop-brand-${brand}`} />
                      <Label htmlFor={`desktop-brand-${brand}`} className="text-sm">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Category</h4>
                <div className="space-y-2">
                  {subcategories.map((subcat) => (
                    <div key={subcat} className="flex items-center space-x-2">
                      <Checkbox id={`desktop-category-${subcat}`} />
                      <Label htmlFor={`desktop-category-${subcat}`} className="text-sm">
                        {subcat}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Rating</h4>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="desktop-rating-all" />
                    <Label htmlFor="desktop-rating-all" className="text-sm">
                      All Ratings
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4plus" id="desktop-rating-4plus" />
                    <Label htmlFor="desktop-rating-4plus" className="text-sm">
                      4★ & Above
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3plus" id="desktop-rating-3plus" />
                    <Label htmlFor="desktop-rating-3plus" className="text-sm">
                      3★ & Above
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button size="sm" className="flex-1">
                Apply
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-3">
                    <div className="relative h-40 mb-3">
                      <Image
                        src={
                          product.image ||
                          `/placeholder.svg?height=300&width=300&query=${encodeURIComponent(product.name)}`
                        }
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
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

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
