import { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  ShoppingBag,
  Star,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Footer from "../components/Footer";
import { bestSellers } from "../data/products";
import { useRevealGroup } from "../hooks/useReveal";

const heroSlides = [
  {
    url: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "The Obsidian Edit 2026",
    subtitle: "Elevated Essentials for the Nocturnal Curator",
    description:
      "Discover our curated collection of responsibly sourced fabrics and deep-toned silhouettes designed for the contemporary eye.",
  },
  {
    url: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Artisanal Craftsmanship",
    subtitle: "Where Tradition Meets Modernity",
    description:
      "Each piece tells a story of dedication, skill, and timeless design philosophy.",
  },
  {
    url: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "Sustainable Luxury",
    subtitle: "Consciously Crafted for Tomorrow",
    description:
      "Experience fashion that respects both heritage and our planet.",
  },
];

const collections = [
  {
    id: "linen",
    title: "The Linen Series",
    cta: "EXPLORE NOW",
    image:
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200",
    size: "large",
    description: "Breathtaking comfort meets sustainable elegance",
  },
  {
    id: "footwear",
    title: "Artisanal Footwear",
    cta: "SHOP COLLECTION",
    image:
      "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800",
    size: "small",
    description: "Handcrafted for the discerning walker",
  },
  {
    id: "watches",
    title: "Timepieces",
    cta: "DISCOVER",
    image:
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800",
    size: "small",
    description: "Precision engineering meets artistic design",
  },
  {
    id: "tailored",
    title: "The Tailored Edit",
    cta: "BROWSE PIECES",
    image:
      "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=1200",
    size: "large",
    description: "Sartorial excellence redefined",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Isabella Rossi",
    role: "Fashion Director",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: "The attention to detail in every piece is extraordinary. Obsidian has become my go-to for timeless elegance.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Creative Consultant",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: "Finally, a brand that understands the intersection of sustainability and style. Absolutely revolutionary.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia Williams",
    role: "Editor-in-Chief",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: "The linen series alone is worth the investment. Quality that speaks for itself.",
    rating: 5,
  },
];

function HeroSection({ onNavigate }) {
  const heroRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Images with Ken Burns Effect */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
            index === currentIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
          }`}
        >
          <img
            src={slide.url}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Enhanced Gradient Overlay for Better Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        </div>
      ))}

      {/* Animated Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center">
        <div
          className={`transform transition-all duration-700 ease-out ${
            isTransitioning
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 text-white/80" />
              <p className="text-white/90 uppercase tracking-[0.3em] text-xs font-light">
                {heroSlides[currentIndex].title}
              </p>
              <Sparkles className="w-4 h-4 text-white/80" />
            </div>
          </div>

          <h1 className="font-serif text-5xl md:text-8xl font-light leading-[1.1] text-white mb-6 max-w-4xl mx-auto">
            {heroSlides[currentIndex].subtitle}
          </h1>

          <p className="text-white/80 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto font-light">
            {heroSlides[currentIndex].description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate("collection")}
              className="group relative px-10 py-4 bg-white text-black tracking-widest text-xs uppercase font-medium overflow-hidden transition-all duration-300 hover:bg-black hover:text-white border-2 border-white"
            >
              <span className="relative z-10">Shop New Arrivals</span>
              <div className="absolute inset-0 bg-black transform translate-x-full transition-transform duration-300 group-hover:translate-x-0" />
            </button>

            <button
              onClick={() => onNavigate("collection")}
              className="px-10 py-4 border-2 border-white/40 text-white tracking-widest text-xs uppercase hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Explore Collections
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="group relative"
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/40 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function CollectionsGrid({ onNavigate }) {
  const groupRef = useRevealGroup();

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Section Header with Enhanced Animation */}
      <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
        <div>
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-2 animate-reveal">
            Curated Selections
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-2 animate-reveal stagger-1">
            Thematic Departures
          </h2>
          <p className="text-[#888] text-sm max-w-md animate-reveal stagger-2">
            Discover our thoughtfully curated collections for the season ahead.
          </p>
        </div>
        <button
          onClick={() => onNavigate("collection")}
          className="group hidden sm:flex items-center gap-2 text-white/70 text-sm font-light hover:text-accent transition-all animate-reveal stagger-3"
        >
          View All Collections
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div ref={groupRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Featured Collection - Large */}
        <div className="relative group cursor-pointer overflow-hidden animate-reveal">
          <div className="relative h-[600px] overflow-hidden">
            <img
              src={collections[0].image}
              alt={collections[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-0 transition-transform duration-500 group-hover:-translate-y-2">
            <h3 className="font-serif text-3xl text-white mb-2">
              {collections[0].title}
            </h3>
            <p className="text-white/70 text-sm mb-4 max-w-md">
              {collections[0].description}
            </p>
            <button
              onClick={() => onNavigate("collection")}
              className="text-white text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all"
            >
              {collections[0].cta}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column - Smaller Collections */}
        <div className="flex flex-col gap-6">
          {/* Top Small Collection */}
          <div className="relative group cursor-pointer overflow-hidden h-[280px] animate-reveal stagger-1">
            <img
              src={collections[1].image}
              alt={collections[1].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-serif text-2xl text-white mb-1">
                {collections[1].title}
              </h3>
              <p className="text-white/70 text-sm mb-2">
                {collections[1].description}
              </p>
              <button className="text-white/90 text-xs uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                {collections[1].cta}
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Bottom Row - Two Collections */}
          <div className="grid grid-cols-2 gap-6">
            {collections.slice(2).map((collection, idx) => (
              <div
                key={collection.id}
                className="relative group cursor-pointer overflow-hidden h-[280px] animate-reveal stagger-2"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl text-white mb-1">
                    {collection.title}
                  </h3>
                  <p className="text-white/70 text-xs mb-2">
                    {collection.description}
                  </p>
                  <button className="text-white/90 text-xs uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                    {collection.cta}
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BestSellersSection({ onNavigate }) {
  const groupRef = useRevealGroup();
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 bg-gradient-to-b from-transparent to-white/5">
      <div className="text-center mb-16">
        <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3 animate-reveal">
          Community Favorites
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4 animate-reveal stagger-1">
          Best Sellers
        </h2>
        <p className="text-[#888] text-sm max-w-2xl mx-auto animate-reveal stagger-2">
          Our community's most beloved pieces, chosen for their unparalleled
          quality and versatility. Each piece tells a story of craftsmanship and
          timeless design.
        </p>
      </div>

      <div
        ref={groupRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
      >
        {bestSellers.map((product, i) => (
          <div
            key={product.id}
            className="group cursor-pointer animate-reveal"
            onClick={() => onNavigate("product")}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Quick View Overlay */}
              <div
                className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300 ${
                  hoveredId === product.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <button className="px-6 py-2 bg-white text-black text-xs uppercase tracking-wider transform transition-all duration-300 hover:scale-105">
                  Quick View
                </button>
              </div>
              {/* Badge */}
              {i === 0 && (
                <div className="absolute top-4 left-4 bg-accent text-black text-[10px] uppercase tracking-wider px-2 py-1">
                  Best Seller
                </div>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-white text-sm font-light group-hover:text-accent transition-colors">
                {product.name}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-accent text-sm font-medium">
                  {product.currency}
                  {product.price.toFixed(2)}
                </p>
                {product.originalPrice && (
                  <p className="text-[#555] text-xs line-through">
                    {product.currency}
                    {product.originalPrice.toFixed(2)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-3 h-3 fill-accent text-accent" />
                ))}
                <span className="text-[#666] text-xs ml-2">(124 reviews)</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={() => onNavigate("collection")}
          className="group inline-flex items-center gap-2 text-white/70 hover:text-white text-sm uppercase tracking-wider transition-all"
        >
          View All Products
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
          Testimonials
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4">
          What Our Clients Say
        </h2>
        <p className="text-[#888] text-sm max-w-2xl mx-auto">
          Join thousands of satisfied customers who have elevated their style
          with Obsidian.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, idx) => (
          <div
            key={testimonial.id}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-sm hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 mb-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-medium text-sm">
                  {testimonial.name}
                </p>
                <p className="text-[#666] text-xs">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              "{testimonial.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: "✨",
      title: "Sustainable Materials",
      description: "Ethically sourced and eco-friendly fabrics",
    },
    {
      icon: "🚚",
      title: "Free Worldwide Shipping",
      description: "On orders over $200",
    },
    {
      icon: "🔄",
      title: "30-Day Returns",
      description: "Hassle-free return policy",
    },
    {
      icon: "💎",
      title: "Lifetime Warranty",
      description: "Crafted to last a lifetime",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="text-center group">
            <div className="text-3xl mb-3 transition-transform group-hover:scale-110 inline-block">
              {feature.icon}
            </div>
            <h3 className="text-white text-sm font-medium mb-1">
              {feature.title}
            </h3>
            <p className="text-[#666] text-xs">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <HeroSection onNavigate={onNavigate} />
      <FeaturesSection />
      <CollectionsGrid onNavigate={onNavigate} />
      <BestSellersSection onNavigate={onNavigate} />
      <TestimonialsSection />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
