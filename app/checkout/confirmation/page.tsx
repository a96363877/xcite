"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle2, Package, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"

export default function ConfirmationPage() {
  const { cartItems, totalPrice, clearCart } = useCart()

  // Generate a random order number
  const orderNumber = Math.floor(10000000 + Math.random() * 90000000)

  // Calculate order summary
  const subtotal = totalPrice
  const shipping = subtotal > 20 ? 0 : 2
  const discount = 0
  const total = subtotal + shipping - discount

  // Clear cart on successful order
  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="container max-w-3xl py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-medium text-muted-foreground text-sm mb-1">Order Number</h3>
              <p className="font-medium">{orderNumber}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground text-sm mb-1">Order Date</h3>
              <p className="font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground text-sm mb-1">Payment Method</h3>
              <p className="font-medium">Credit Card (•••• 3456)</p>
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground text-sm mb-1">Shipping Method</h3>
              <p className="font-medium">Standard Delivery (3-5 business days)</p>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-semibold">Order Summary</h3>

            <div className="space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{(item.price * item.quantity).toFixed(3)} KD</p>
                  </div>
                ))
              ) : (
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Samsung Galaxy S23 Ultra</p>
                    <p className="text-sm text-muted-foreground">Qty: 1</p>
                  </div>
                  <p className="font-medium">379.900 KD</p>
                </div>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{subtotal > 0 ? subtotal.toFixed(3) : "379.900"} KD</span>
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
              <div className="flex justify-between font-medium text-lg pt-2">
                <span>Total</span>
                <span>{total > 0 ? total.toFixed(3) : "379.900"} KD</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Shipping Address</h3>
            </div>
            <address className="not-italic">
              <p>John Doe</p>
              <p>Block 4, Street 23, House 10</p>
              <p>Salmiya, Hawalli</p>
              <p>Kuwait, 22000</p>
              <p className="mt-2">+965 9876 5432</p>
            </address>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Billing Address</h3>
            </div>
            <address className="not-italic">
              <p>John Doe</p>
              <p>Block 4, Street 23, House 10</p>
              <p>Salmiya, Hawalli</p>
              <p>Kuwait, 22000</p>
              <p className="mt-2">+965 9876 5432</p>
            </address>
          </CardContent>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <p className="text-muted-foreground">A confirmation email has been sent to your email address.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/account/orders">View Order History</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
