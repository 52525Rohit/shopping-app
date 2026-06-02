import { useState } from "react";
import { ArrowLeft, Shield, Lock, CreditCard } from "lucide-react";
import Footer from "../components/Footer";

const steps = ["Shipping", "Method", "Payment"];

const orderItems = [
  {
    name: "The Archive Issue No. 4",
    detail: "Limited Edition • Print",
    qty: 1,
    price: 45,
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=120",
  },
  {
    name: "Sculptural Paperweight",
    detail: "Solid Brass • Matte Finish",
    qty: 1,
    price: 85,
    image:
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=120",
  },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-3">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-display font-bold transition-all duration-300 ${
                i < current
                  ? "bg-accent border-accent text-black"
                  : i === current
                    ? "bg-accent border-accent text-black"
                    : "border-[#333] text-[#555]"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-xs font-display tracking-wide transition-colors duration-300 ${
                i === current
                  ? "text-accent"
                  : i < current
                    ? "text-[#888]"
                    : "text-[#444]"
              }`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-px w-12 transition-all duration-300 ${i < current ? "bg-accent" : "bg-[#222]"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function OrderSummary({ onNavigate }) {
  const subtotal = orderItems.reduce((a, b) => a + b.price * b.qty, 0);
  const shipping = 12;
  const tax = (subtotal * 0.203).toFixed(2);
  const total = (subtotal + shipping + parseFloat(tax)).toFixed(2);

  return (
    <div className="bg-[#131313] border border-[#1e1e1e] p-6 sticky top-24">
      <h3 className="font-serif text-xl text-white mb-6">Order Summary</h3>
      <div className="space-y-4 mb-6">
        {orderItems.map((item) => (
          <div key={item.name} className="flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-light">{item.name}</p>
              <p className="text-[#666] text-xs">{item.detail}</p>
              <p className="text-[#666] text-xs">Qty: {item.qty}</p>
            </div>
            <p className="text-white text-sm whitespace-nowrap">
              £{item.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-[#1e1e1e] pt-4 space-y-2">
        <div className="flex justify-between text-sm text-[#888]">
          <span>Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-[#888]">
          <span>Shipping</span>
          <span>£{shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-[#888]">
          <span>Estimated Tax</span>
          <span>£{tax}</span>
        </div>
        <div className="flex justify-between text-sm font-light pt-3 border-t border-[#1e1e1e]">
          <span className="text-accent">Total</span>
          <span className="text-accent text-lg">£{total}</span>
        </div>
      </div>

      <div className="mt-3 border-t border-[#1e1e1e] pt-4">
        <button className="flex items-center justify-between w-full text-sm text-[#777] hover:text-white transition-colors py-1">
          Have a promo code?
          <span className="text-[#444]">›</span>
        </button>
      </div>

      <button
        onClick={() => onNavigate("home")}
        className="w-full btn-teal text-center py-4 mt-4 text-xs tracking-widest"
      >
        Complete Purchase
      </button>

      <div className="flex justify-center gap-4 mt-4">
        <Shield size={14} className="text-[#444]" />
        <Lock size={14} className="text-[#444]" />
        <Shield size={14} className="text-[#444]" />
      </div>
    </div>
  );
}

export default function Checkout({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("priority");
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      {/* Minimal checkout header */}
      <header className="border-b border-[#1a1a1a] px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => onNavigate("home")}
          className="font-serif text-lg text-accent hover:opacity-70 transition-opacity"
        >
          Luxe Editorial
        </button>
        <div className="flex items-center gap-2 text-accent text-xs font-display">
          <Lock size={13} />
          Secure Checkout
        </div>
        <button
          onClick={() => onNavigate("product")}
          className="flex items-center gap-1.5 text-[#777] text-xs font-display hover:text-white transition-colors"
        >
          <ArrowLeft size={13} /> Back to Cart
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 pt-8 pb-16">
        {/* Steps */}
        <div
          className="mb-10"
          style={{ animation: "fadeIn 0.5s ease forwards" }}
        >
          <StepIndicator current={currentStep} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-8">
          {/* Left form */}
          <div style={{ animation: "fadeUp 0.6s ease 0.1s both" }}>
            {/* Shipping Address */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-light text-white">
                  Shipping Address
                </h2>
                <span className="text-[#555] text-sm font-display">
                  Step 1 of 3
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#888] text-xs font-display mb-2 tracking-widest uppercase">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Julian"
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="block text-[#888] text-xs font-display mb-2 tracking-widest uppercase">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Vane"
                    className="input-dark"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[#888] text-xs font-display mb-2 tracking-widest uppercase">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="123 Editorial Way"
                  className="input-dark"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#888] text-xs font-display mb-2 tracking-widest uppercase">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="London"
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="block text-[#888] text-xs font-display mb-2 tracking-widest uppercase">
                    Postcode
                  </label>
                  <input
                    type="text"
                    placeholder="EC1A 1BB"
                    className="input-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#888] text-xs font-display mb-2 tracking-widest uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="julian@example.com"
                  className="input-dark"
                />
                <p className="text-[#444] text-xs mt-1.5">
                  We'll send your receipt and tracking info here.
                </p>
              </div>
            </section>

            {/* Shipping Method */}
            <section className="mb-10">
              <h2 className="font-serif text-2xl font-light text-white mb-6">
                Shipping Method
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => setShippingMethod("priority")}
                  className={`w-full border p-4 text-left flex items-center justify-between transition-all duration-200 ${
                    shippingMethod === "priority"
                      ? "border-accent bg-accent/5"
                      : "border-[#222] hover:border-[#333]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        shippingMethod === "priority"
                          ? "border-accent"
                          : "border-[#333]"
                      }`}
                    >
                      {shippingMethod === "priority" && (
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-display ${shippingMethod === "priority" ? "text-accent" : "text-[#ccc]"}`}
                      >
                        Priority Courier
                      </p>
                      <p className="text-[#555] text-xs">
                        1–2 Business Days • Carbon Neutral
                      </p>
                    </div>
                  </div>
                  <span className="text-white text-sm">£12.00</span>
                </button>

                <button
                  onClick={() => setShippingMethod("standard")}
                  className={`w-full border p-4 text-left flex items-center justify-between transition-all duration-200 ${
                    shippingMethod === "standard"
                      ? "border-accent bg-accent/5"
                      : "border-[#222] hover:border-[#333]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        shippingMethod === "standard"
                          ? "border-accent"
                          : "border-[#333]"
                      }`}
                    >
                      {shippingMethod === "standard" && (
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      )}
                    </div>
                    <div>
                      <p className="text-[#ccc] text-sm font-display">
                        Standard Editorial
                      </p>
                      <p className="text-[#555] text-xs">3–5 Business Days</p>
                    </div>
                  </div>
                  <span className="text-white text-sm">£5.00</span>
                </button>
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="font-serif text-2xl font-light text-white mb-6">
                Payment Details
              </h2>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 border py-3 flex items-center justify-center gap-2 text-sm font-display tracking-wide transition-all ${
                    paymentMethod === "card"
                      ? "border-accent text-accent"
                      : "border-[#222] text-[#777] hover:border-[#333]"
                  }`}
                >
                  <CreditCard size={14} /> Card
                </button>
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex-1 border py-3 flex items-center justify-center text-sm font-display tracking-wide transition-all ${
                    paymentMethod === "paypal"
                      ? "border-accent text-accent"
                      : "border-[#222] text-[#777] hover:border-[#333]"
                  }`}
                >
                  <span className="italic font-bold text-blue-400">Pay</span>
                  <span className="italic font-bold text-blue-600">Pal</span>
                </button>
              </div>

              {paymentMethod === "card" && (
                <div
                  className="space-y-4"
                  style={{ animation: "fadeUp 0.4s ease forwards" }}
                >
                  <div>
                    <label className="block text-[#888] text-xs font-display mb-2 tracking-widest uppercase">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      placeholder="Julian Vane"
                      className="input-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-[#888] text-xs font-display mb-2 tracking-widest uppercase">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="input-dark pr-10"
                      />
                      <CreditCard
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#444]"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#888] text-xs font-display mb-2 tracking-widest uppercase">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="input-dark"
                      />
                    </div>
                    <div>
                      <label className="block text-[#888] text-xs font-display mb-2 tracking-widest uppercase">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="input-dark"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right: Order summary */}
          <div style={{ animation: "fadeUp 0.6s ease 0.3s both" }}>
            <OrderSummary onNavigate={onNavigate} />
          </div>
        </div>
      </div>

      <Footer variant="full" onNavigate={onNavigate} />
    </div>
  );
}
