"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart()
  const { toast } = useToast()
  const [couponCode, setCouponCode] = useState("")

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id)
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart`,
    })
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity >= 1) {
      updateQuantity(id, quantity)
    }
  }

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      toast({
        title: "Coupon applied",
        description: `Coupon "${couponCode}" has been applied to your order`,
      })
    }
  }

  // Calculate order summary
  const subtotal = totalPrice
  const shipping = subtotal > 20 ? 0 : 2
  const discount = 0 // This would be calculated based on applied coupons
  const total = subtotal + shipping - discount

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <ShoppingCart className="mr-3 h-8 w-8" />
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted px-6 py-4 hidden md:grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <h3 className="font-medium">Product</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="font-medium">Price</h3>
                </div>
                <div className="col-span-2 text-center">
                  <h3 className="font-medium">Quantity</h3>
                </div>
                <div className="col-span-2 text-right">
                  <h3 className="font-medium">Total</h3>
                </div>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="px-6 py-4 md:grid md:grid-cols-12 md:gap-4 md:items-center border-t first:border-t-0"
                >
                  <div className="md:col-span-6 flex items-center">
                    <div className="relative w-20 h-20 rounded border overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          item.image || `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(item.name)}`
                        }
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="ml-4">
                      <Link href={`/product/${item.id}`} className="font-medium hover:underline">
                        {item.name}
                      </Link>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="flex items-center text-sm text-red-500 mt-1 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 md:text-center mt-4 md:mt-0">
                    <div className="flex items-center justify-between md:block">
                      <span className="md:hidden font-medium">Price:</span>
                      <span>{item.price.toFixed(3)} KD</span>
                    </div>
                  </div>

                  <div className="md:col-span-2 md:text-center mt-4 md:mt-0">
                    <div className="flex items-center justify-between md:justify-center">
                      <span className="md:hidden font-medium">Quantity:</span>
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 md:text-right mt-4 md:mt-0">
                    <div className="flex items-center justify-between md:block">
                      <span className="md:hidden font-medium">Total:</span>
                      <span className="font-medium">{(item.price * item.quantity).toFixed(3)} KD</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="flex">
                  <Input
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button onClick={handleApplyCoupon} className="rounded-l-none" disabled={!couponCode.trim()}>
                    Apply
                  </Button>
                </div>
              </div>
              <Button asChild variant="outline">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          <div>
            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted px-6 py-4">
                <h3 className="font-medium text-lg">Order Summary</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{subtotal.toFixed(3)} KD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `${shipping.toFixed(3)} KD`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{discount.toFixed(3)} KD</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{total.toFixed(3)} KD</span>
                </div>
                <Button asChild className="w-full mt-4" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <div className="text-xs text-center text-muted-foreground mt-4">Taxes may apply at checkout</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
