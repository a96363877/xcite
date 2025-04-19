"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Share2, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"

// Mock product data - in a real app, this would come from an API
const getProductById = (id: string) => {
  const products = [
    {
      id: "1",
      name: "Samsung Galaxy S23 Ultra",
      price: 379.9,
      originalPrice: 429.9,
      rating: 4.5,
      reviewCount: 127,
      description:
        "Experience the power of the Samsung Galaxy S23 Ultra with its stunning 6.8-inch Dynamic AMOLED 2X display, powerful Snapdragon 8 Gen 2 processor, and versatile camera system featuring a 200MP main sensor.",
      features: [
        "6.8-inch Dynamic AMOLED 2X display",
        "Snapdragon 8 Gen 2 processor",
        "200MP main camera",
        "5000mAh battery",
        "S Pen included",
        "Android 13 with One UI 5.1",
      ],
      specifications: {
        Display: "6.8-inch Dynamic AMOLED 2X, 3088 x 1440 pixels, 120Hz",
        Processor: "Snapdragon 8 Gen 2",
        RAM: "12GB",
        Storage: "256GB/512GB/1TB",
        "Rear Camera": "200MP main + 12MP ultrawide + 10MP telephoto (3x) + 10MP telephoto (10x)",
        "Front Camera": "12MP",
        Battery: "5000mAh",
        Charging: "45W wired, 15W wireless",
        OS: "Android 13 with One UI 5.1",
        Dimensions: "163.4 x 78.1 x 8.9 mm",
        Weight: "233g",
        Colors: "Phantom Black, Cream, Green, Lavender",
      },
      images: [
        "/placeholder.svg?height=600&width=600&query=samsung galaxy s23 ultra front view",
        "/placeholder.svg?height=600&width=600&query=samsung galaxy s23 ultra back view",
        "/placeholder.svg?height=600&width=600&query=samsung galaxy s23 ultra side view",
        "/placeholder.svg?height=600&width=600&query=samsung galaxy s23 ultra with s pen",
      ],
      stock: 15,
      sku: "SM-S918B",
      category: "Phones & Accessories",
    },
    {
      id: "2",
      name: "Apple MacBook Air M2",
      price: 499.9,
      originalPrice: 549.9,
      rating: 4.8,
      reviewCount: 89,
      description:
        "The MacBook Air with M2 chip is incredibly thin and delivers extraordinary performance. With up to 18 hours of battery life, it's the ultraportable, ultracapable laptop that lets you work, play, or create just about anything — anywhere.",
      features: [
        "Apple M2 chip with 8-core CPU and 8-core GPU",
        "13.6-inch Liquid Retina display",
        "8GB unified memory",
        "256GB SSD storage",
        "1080p FaceTime HD camera",
        "MagSafe charging port",
      ],
      specifications: {
        Chip: "Apple M2",
        CPU: "8-core",
        GPU: "8-core or 10-core",
        Memory: "8GB, 16GB, or 24GB unified memory",
        Storage: "256GB, 512GB, 1TB, or 2TB SSD",
        Display: "13.6-inch Liquid Retina display, 2560 x 1664 resolution",
        Camera: "1080p FaceTime HD camera",
        Audio: "Four-speaker sound system, Three-mic array",
        Ports: "MagSafe charging port, Two Thunderbolt / USB 4 ports, 3.5mm headphone jack",
        Wireless: "Wi-Fi 6 (802.11ax), Bluetooth 5.0",
        Battery: "Up to 18 hours",
        Dimensions: "11.97 x 8.46 x 0.44 inches",
        Weight: "2.7 pounds",
        Colors: "Midnight, Starlight, Space Gray, Silver",
      },
      images: [
        "/placeholder.svg?height=600&width=600&query=macbook air m2 front view",
        "/placeholder.svg?height=600&width=600&query=macbook air m2 side view",
        "/placeholder.svg?height=600&width=600&query=macbook air m2 keyboard",
        "/placeholder.svg?height=600&width=600&query=macbook air m2 ports",
      ],
      stock: 8,
      sku: "MBA-M2-256",
      category: "Computers & Tablets",
    },
  ]

  return products.find((product) => product.id === id) || products[0]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value)
    }
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`,
    })
  }

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link
          href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-muted-foreground hover:text-foreground"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium truncate">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square border rounded-lg overflow-hidden">
            <Image
              src={
                product.images[activeImage] ||
                `/placeholder.svg?height=600&width=600&query=${encodeURIComponent(product.name)}`
              }
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square border rounded-md overflow-hidden ${
                  activeImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={
                    image ||
                    `/placeholder.svg?height=150&width=150&query=${encodeURIComponent(product.name)} - thumbnail ${index + 1}`
                  }
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : i < product.rating
                          ? "fill-primary text-primary opacity-50"
                          : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center">
              <span className="text-3xl font-bold">{product.price.toFixed(3)} KD</span>
              {product.originalPrice && (
                <span className="ml-2 text-lg text-muted-foreground line-through">
                  {product.originalPrice.toFixed(3)} KD
                </span>
              )}
            </div>
            {product.originalPrice && (
              <div className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                Save {((1 - product.price / product.originalPrice) * 100).toFixed(0)}%
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-4">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="ml-4 text-sm text-muted-foreground">{product.stock} available</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1" size="lg" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5 mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Truck className="h-4 w-4 mr-2" />
              <span>Free delivery for orders over 20 KD</span>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <h3 className="font-medium">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between text-sm pt-4 border-t">
            <div>
              SKU: <span className="font-medium">{product.sku}</span>
            </div>
            <div>
              Category:{" "}
              <Link
                href={`/category/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
                className="font-medium hover:underline"
              >
                {product.category}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="py-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex border-b pb-2">
                  <span className="font-medium w-1/3">{key}</span>
                  <span className="w-2/3">{value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <div className="flex items-center mb-6">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : i < product.rating
                          ? "fill-primary text-primary opacity-50"
                          : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">{product.rating} out of 5</span>
            </div>
            <p className="text-muted-foreground">Based on {product.reviewCount} reviews</p>

            <div className="mt-8">
              <Button>Write a Review</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
