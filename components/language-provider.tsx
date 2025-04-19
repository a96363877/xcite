"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  dir: "ltr",
})

// Translation dictionary
const translations: Record<string, Record<string, string>> = {
  // Header
  Home: { ar: "الرئيسية" },
  Search: { ar: "بحث" },
  Account: { ar: "حسابي" },
  Cart: { ar: "سلة التسوق" },
  More: { ar: "المزيد" },

  // Categories
  "Phones & Accessories": { ar: "الهواتف والإكسسوارات" },
  "TV & Accessories": { ar: "التلفزيونات والإكسسوارات" },
  "Computers & Tablets": { ar: "الكمبيوترات والأجهزة اللوحية" },
  "Air Conditioning": { ar: "أجهزة تكييف الهواء" },
  "Home Appliances": { ar: "الأجهزة المنزلية" },
  "Kitchen Appliances": { ar: "أجهزة المطبخ" },
  Gaming: { ar: "ألعاب الفيديو" },
  "Super Cards": { ar: "البطاقات الذكية" },

  // Banners
  "Summer Sale": { ar: "تخفيضات الصيف" },
  "Up to 50% off on selected items": { ar: "خصم يصل إلى 50٪ على منتجات مختارة" },
  "Shop Now": { ar: "تسوق الآن" },
  "New Arrivals": { ar: "وصل حديثاً" },
  "Check out the latest tech gadgets": { ar: "تعرف على أحدث الأجهزة التقنية" },
  Discover: { ar: "اكتشف" },
  "Beat the Heat": { ar: "تغلب على الحرارة" },
  "Special offers on air conditioners": { ar: "عروض خاصة على مكيفات الهواء" },
  "Shop AC": { ar: "تسوق المكيفات" },

  // Product sections
  "Hero Picks": { ar: "اختيارات مميزة" },
  "Mobile Phones": { ar: "الهواتف المحمولة" },
  Laptops: { ar: "أجهزة اللابتوب" },
  "Air Conditioners": { ar: "مكيفات الهواء" },
  "Kitchen Appliances": { ar: "أجهزة المطبخ" },

  // Deals
  "DEALS BELOW 9.9 KD!": { ar: "عروض أقل من 9.9 دينار!" },
  "DEALS BELOW 49.9 KD!": { ar: "عروض أقل من 49.9 دينار!" },
  "DEALS BELOW 99.9 KD!": { ar: "عروض أقل من 99.9 دينار!" },
  "FREE SHIPPING": { ar: "شحن مجاني" },
  "On orders over 20 KD": { ar: "على الطلبات التي تزيد عن 20 دينار" },

  // Product details
  "Add to Cart": { ar: "أضف إلى السلة" },
  "Add to Wishlist": { ar: "أضف إلى المفضلة" },
  Quantity: { ar: "الكمية" },
  available: { ar: "متوفر" },
  "Key Features": { ar: "المميزات الرئيسية" },
  Description: { ar: "الوصف" },
  Specifications: { ar: "المواصفات" },
  Reviews: { ar: "التقييمات" },
  "Free delivery for orders over 20 KD": { ar: "توصيل مجاني للطلبات التي تزيد عن 20 دينار" },

  // Cart
  "Your Cart": { ar: "سلة التسوق" },
  "Your cart is empty": { ar: "سلة التسوق فارغة" },
  "Looks like you haven't added anything to your cart yet.": { ar: "يبدو أنك لم تضف أي منتجات إلى سلة التسوق بعد." },
  "Continue Shopping": { ar: "مواصلة التسوق" },
  Product: { ar: "المنتج" },
  Price: { ar: "السعر" },
  Total: { ar: "المجموع" },
  Remove: { ar: "إزالة" },
  "Coupon code": { ar: "رمز القسيمة" },
  Apply: { ar: "تطبيق" },
  "Order Summary": { ar: "ملخص الطلب" },
  Subtotal: { ar: "المجموع الفرعي" },
  Shipping: { ar: "الشحن" },
  Free: { ar: "مجاني" },
  Discount: { ar: "الخصم" },
  "Proceed to Checkout": { ar: "المتابعة إلى الدفع" },
  "Taxes may apply at checkout": { ar: "قد تطبق الضرائب عند الدفع" },

  // Checkout
  Checkout: { ar: "الدفع" },
  Shipping: { ar: "الشحن" },
  Payment: { ar: "الدفع" },
  Verification: { ar: "التحقق" },
  "Shipping Information": { ar: "معلومات الشحن" },
  "First Name": { ar: "الاسم الأول" },
  "Last Name": { ar: "اسم العائلة" },
  Email: { ar: "البريد الإلكتروني" },
  Phone: { ar: "رقم الهاتف" },
  Address: { ar: "العنوان" },
  City: { ar: "المدينة" },
  Area: { ar: "المنطقة" },
  "Postal Code": { ar: "الرمز البريدي" },
  "Shipping Method": { ar: "طريقة الشحن" },
  "Standard Delivery": { ar: "التوصيل العادي" },
  "Delivery within 3-5 business days": { ar: "التوصيل خلال 3-5 أيام عمل" },
  "Express Delivery": { ar: "التوصيل السريع" },
  "Delivery within 1-2 business days": { ar: "التوصيل خلال 1-2 يوم عمل" },
  "Continue to Payment": { ar: "المتابعة إلى الدفع" },

  // Payment
  "Payment Information": { ar: "معلومات الدفع" },
  "Credit Card": { ar: "بطاقة ائتمان" },
  KNET: { ar: "كي نت" },
  "Cash on Delivery": { ar: "الدفع عند الاستلام" },
  "Card Number": { ar: "رقم البطاقة" },
  "Cardholder Name": { ar: "اسم حامل البطاقة" },
  "Expiry Date": { ar: "تاريخ الانتهاء" },
  CVV: { ar: "رمز التحقق" },
  "Save card for future purchases": { ar: "حفظ البطاقة للمشتريات المستقبلية" },
  "Your payment information is secure and encrypted": { ar: "معلومات الدفع الخاصة بك آمنة ومشفرة" },
  "Back to Shipping": { ar: "العودة إلى الشحن" },
  "Continue to Verification": { ar: "المتابعة إلى التحقق" },

  // OTP
  "OTP Verification": { ar: "التحقق برمز OTP" },
  "We've sent a one-time password to your phone number ending in": {
    ar: "لقد أرسلنا كلمة مرور لمرة واحدة إلى رقم هاتفك المنتهي بـ",
  },
  "Didn't receive the code?": { ar: "لم تستلم الرمز؟" },
  "Resend OTP": { ar: "إعادة إرسال الرمز" },
  "Back to Payment": { ar: "العودة إلى الدفع" },
  "Complete Order": { ar: "إتمام الطلب" },

  // Footer
  "Your one-stop shop for electronics, home appliances, and more.": {
    ar: "متجرك الشامل للإلكترونيات والأجهزة المنزلية والمزيد.",
  },
  Shop: { ar: "تسوق" },
  Account: { ar: "الحساب" },
  "My Account": { ar: "حسابي" },
  "Order History": { ar: "سجل الطلبات" },
  Wishlist: { ar: "المفضلة" },
  Returns: { ar: "المرتجعات" },
  "Customer Service": { ar: "خدمة العملاء" },
  "Contact Us": { ar: "اتصل بنا" },
  "Shipping Policy": { ar: "سياسة الشحن" },
  "Returns Policy": { ar: "سياسة الإرجاع" },
  FAQ: { ar: "الأسئلة الشائعة" },
  Legal: { ar: "قانوني" },
  "Terms of Service": { ar: "شروط الخدمة" },
  "Privacy Policy": { ar: "سياسة الخصوصية" },
  "Cookie Policy": { ar: "سياسة ملفات تعريف الارتباط" },
  "All rights reserved.": { ar: "جميع الحقوق محفوظة." },

  // Filter
  Filter: { ar: "تصفية" },
  "Filter Products": { ar: "تصفية المنتجات" },
  "Price Range": { ar: "نطاق السعر" },
  Brand: { ar: "العلامة التجارية" },
  Category: { ar: "الفئة" },
  Rating: { ar: "التقييم" },
  "All Ratings": { ar: "جميع التقييمات" },
  "& Above": { ar: "وما فوق" },
  "Apply Filters": { ar: "تطبيق التصفية" },
  Reset: { ar: "إعادة تعيين" },
  "Sort by": { ar: "ترتيب حسب" },
  Featured: { ar: "مميز" },
  "Price: Low to High": { ar: "السعر: من الأقل إلى الأعلى" },
  "Price: High to Low": { ar: "السعر: من الأعلى إلى الأقل" },
  "Newest Arrivals": { ar: "أحدث الوصولات" },
  "No products found": { ar: "لم يتم العثور على منتجات" },
  "Try adjusting your filters": { ar: "حاول تعديل عوامل التصفية" },

  // Language
  English: { ar: "الإنجليزية" },
  Arabic: { ar: "العربية" },
  Language: { ar: "اللغة" },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const dir = language === "ar" ? "rtl" : "ltr"

  // Function to translate text
  const t = (key: string): string => {
    if (language === "en") return key
    return translations[key]?.ar || key
  }

  // Set language and store in localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = lang
  }

  // Initialize language from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguageState(savedLanguage)
      document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr"
      document.documentElement.lang = savedLanguage
    }
  }, [])

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
