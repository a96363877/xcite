"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, CreditCard, ShieldCheck, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { cartItems, totalPrice } = useCart()
  const router = useRouter()
  const [step, setStep] = useState<"shipping" | "payment" | "otp">("shipping")
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    area: "",
    postalCode: "",
    shippingMethod: "standard",
  })
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  })
  const [otpCode, setOtpCode] = useState(["", "", "", ""])

  // Calculate order summary
  const subtotal = totalPrice
  const shipping = shippingInfo.shippingMethod === "express" ? 5 : subtotal > 20 ? 0 : 2
  const discount = 0
  const total = subtotal + shipping - discount

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
    window.scrollTo(0, 0)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("otp")
    window.scrollTo(0, 0)
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/checkout/confirmation")
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otpCode]
      newOtp[index] = value
      setOtpCode(newOtp)

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        if (nextInput) {
          nextInput.focus()
        }
      }
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link href="/cart" className="text-muted-foreground hover:text-foreground">
          Cart
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="font-medium">Checkout</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === "shipping" ? "bg-primary text-primary-foreground" : "bg-primary text-primary-foreground"
              }`}
            >
              1
            </div>
            <span className="text-sm mt-1">Shipping</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step !== "shipping" ? "bg-primary" : "bg-muted"}`} />
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === "payment" || step === "otp"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              2
            </div>
            <span className="text-sm mt-1">Payment</span>
          </div>
          <div className={`h-1 flex-1 mx-2 ${step === "otp" ? "bg-primary" : "bg-muted"}`} />
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === "otp" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
            <span className="text-sm mt-1">Verification</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Shipping Information */}
          {step === "shipping" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Shipping Information
                </h2>

                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Select
                        value={shippingInfo.city}
                        onValueChange={(value) => setShippingInfo({ ...shippingInfo, city: value })}
                        required
                      >
                        <SelectTrigger id="city">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kuwait-city">Kuwait City</SelectItem>
                          <SelectItem value="hawalli">Hawalli</SelectItem>
                          <SelectItem value="salmiya">Salmiya</SelectItem>
                          <SelectItem value="ahmadi">Ahmadi</SelectItem>
                          <SelectItem value="jahra">Jahra</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area">Area</Label>
                      <Input
                        id="area"
                        value={shippingInfo.area}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, area: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <h3 className="font-medium">Shipping Method</h3>
                    <RadioGroup
                      value={shippingInfo.shippingMethod}
                      onValueChange={(value) => setShippingInfo({ ...shippingInfo, shippingMethod: value })}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 flex justify-between cursor-pointer">
                          <div>
                            <div className="font-medium">Standard Delivery</div>
                            <div className="text-sm text-muted-foreground">Delivery within 3-5 business days</div>
                          </div>
                          <div className="font-medium">{subtotal > 20 ? "Free" : "2.000 KD"}</div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-4">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 flex justify-between cursor-pointer">
                          <div>
                            <div className="font-medium">Express Delivery</div>
                            <div className="text-sm text-muted-foreground">Delivery within 1-2 business days</div>
                          </div>
                          <div className="font-medium">5.000 KD</div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          {step === "payment" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Payment Information
                </h2>

                <form onSubmit={handlePaymentSubmit}>
                  <Tabs defaultValue="card" className="mb-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="knet">KNET</TabsTrigger>
                      <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id="saveCard"
                          checked={paymentInfo.saveCard}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, saveCard: e.target.checked })}
                          className="rounded border-gray-300"
                        />
                        <Label htmlFor="saveCard" className="text-sm cursor-pointer">
                          Save card for future purchases
                        </Label>
                      </div>
                    </TabsContent>
                    <TabsContent value="knet" className="pt-4">
                      <div className="text-center py-8">
                        <Image
                          src="/placeholder.svg?height=60&width=120&query=knet payment logo"
                          alt="KNET"
                          width={120}
                          height={60}
                          className="mx-auto mb-4"
                        />
                        <p className="text-muted-foreground mb-4">
                          You will be redirected to KNET payment gateway to complete your payment.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="cod" className="pt-4">
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">Pay with cash upon delivery of your order.</p>
                        <p className="text-sm text-muted-foreground">
                          Note: An additional fee of 1.000 KD will be applied for Cash on Delivery orders.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex items-center space-x-2 mb-6 p-4 bg-muted rounded-lg">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                    <p className="text-sm">Your payment information is secure and encrypted</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep("shipping")}>
                      Back to Shipping
                    </Button>
                    <Button type="submit" className="flex-1">
                      Continue to Verification
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* OTP Verification */}
          {step === "otp" && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-6">OTP Verification</h2>

                <form onSubmit={handleOtpSubmit}>
                  <div className="text-center mb-6">
                    <p className="mb-4">
                      We've sent a one-time password to your phone number ending in {shippingInfo.phone.slice(-4)}
                    </p>
                    <div className="flex justify-center gap-3 my-8">
                      {otpCode.map((digit, index) => (
                        <Input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-12 text-center text-xl"
                          autoFocus={index === 0}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the code?{" "}
                      <button type="button" className="text-primary hover:underline">
                        Resend OTP
                      </button>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep("payment")}>
                      Back to Payment
                    </Button>
                    <Button type="submit" className="flex-1" disabled={otpCode.some((digit) => !digit)}>
                      Complete Order
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded border overflow-hidden flex-shrink-0">
                      <Image
                        src={
                          item.image || `/placeholder.svg?height=200&width=200&query=${encodeURIComponent(item.name)}`
                        }
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Qty: {item.quantity}</span>
                        <span>{(item.price * item.quantity).toFixed(3)} KD</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
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
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{total.toFixed(3)} KD</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
