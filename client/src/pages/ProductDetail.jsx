import { useState } from "react";
import { Star, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Footer from "../components/Footer";
import { featuredProduct, relatedProducts } from "../data/products";
import { useRevealGroup } from "../hooks/useReveal";

function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            size={13}
            className={s <= rating ? "text-accent fill-accent" : "text-[#444]"}
          />
        ))}
      </div>
      <span className="text-[#666] text-xs">({count} Reviews)</span>
    </div>
  );
}

function AccordionItem({ label }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[#222]">
      <button
        className="w-full flex items-center justify-between py-4 text-sm text-[#ccc] hover:text-white transition-colors font-display tracking-wide"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown
          size={16}
          className={`text-[#555] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}
      >
        <p className="text-[#666] text-sm leading-relaxed pb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore.
        </p>
      </div>
    </div>
  );
}

export default function ProductDetail({ onNavigate }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("S");
  const [activeImage, setActiveImage] = useState(0);
  const relatedRef = useRevealGroup();

  const product = featuredProduct;

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Images */}
          <div>
            <div className="relative img-hover-zoom mb-3">
              <img
                src={
                  (product.images && product.images[activeImage]) ||
                  product.image
                }
                alt={product.name}
                className="w-full aspect-[4/5] object-cover"
                style={{ animation: "scaleIn 0.5s ease forwards" }}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {product.images &&
                product.images.slice(1).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i + 1)}
                    className={`img-hover-zoom border-2 transition-all duration-200 ${
                      activeImage === i + 1
                        ? "border-accent"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* Info */}
          <div
            className="md:sticky md:top-24"
            style={{ animation: "fadeUp 0.7s ease 0.2s both" }}
          >
            <p className="section-label mb-2">{product.tag}</p>
            <StarRating rating={3} count={124} />
            <h1 className="font-serif text-4xl md:text-5xl font-light text-white mt-3 mb-3 leading-tight">
              {product.name}
            </h1>
            <p className="text-accent text-2xl font-light mb-5">
              {product.currency}
              {product.price.toFixed(2)}
            </p>
            <p className="text-[#888] text-sm leading-relaxed mb-7">
              {product.description}
            </p>

            {/* Color */}
            <div className="mb-6">
              <p className="text-[#bbb] text-sm mb-3">
                Color: <span className="text-white">Forest Green</span>
              </p>
              <div className="flex gap-2">
                {product.colors &&
                  product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === i
                          ? "border-accent scale-110"
                          : "border-[#333]"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#bbb] text-sm">Size</p>
                <button className="text-accent text-xs font-display tracking-widest uppercase hover:opacity-70">
                  Size Guide
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes &&
                  product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 border text-sm font-display tracking-wide transition-all duration-200 ${
                        selectedSize === size
                          ? "border-accent text-accent"
                          : "border-[#2a2a2a] text-[#888] hover:border-[#555] hover:text-[#ccc]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => onNavigate("checkout")}
              className="w-full btn-teal text-center py-4 mb-3 text-sm"
            >
              Add to Bag
            </button>
            <button className="w-full py-3 text-accent text-sm font-display tracking-widest uppercase hover:opacity-70 transition-opacity">
              Find in Store
            </button>

            {/* Accordion */}
            <div className="mt-8">
              <AccordionItem label="Composition & Care" />
              <AccordionItem label="Shipping & Returns" />
            </div>
          </div>
        </div>

        {/* Related products */}
        <div className="mt-24">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label mb-2">Complete the Look</p>
              <h2 className="font-serif text-3xl font-light text-white">
                Related Essentials
              </h2>
            </div>
            <div className="flex gap-2">
              <button className="w-9 h-9 border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:border-accent hover:text-accent transition-all">
                <ChevronLeft size={16} />
              </button>
              <button className="w-9 h-9 border border-[#2a2a2a] flex items-center justify-center text-[#888] hover:border-accent hover:text-accent transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={relatedRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {relatedProducts.map((p, i) => (
              <div
                key={p.id}
                className={`product-card cursor-pointer animate-reveal stagger-${i + 1}`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div className="img-hover-zoom">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-light mb-1">{p.name}</p>
                  <p className="text-accent text-sm">
                    {p.currency}
                    {p.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer variant="minimal" onNavigate={onNavigate} />
    </div>
  );
}
