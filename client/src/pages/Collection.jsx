import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import Footer from "../components/Footer";
import { collectionProducts } from "../data/products";
import { useRevealGroup } from "../hooks/useReveal";

const categories = [
  { label: "Ready-to-Wear", count: 142 },
  { label: "Accessories", count: 48 },
  { label: "Shoes", count: 86 },
  { label: "Fine Jewelry", count: 12 },
];
const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["#888", "#ddd", "#c9a96e", "#0fd4bf", "#f5f0e8"];

export default function Collection({ onNavigate }) {
  const [selectedCategories, setSelectedCategories] = useState(["Accessories"]);
  const [selectedSizes, setSelectedSizes] = useState(["S"]);
  const [selectedColor, setSelectedColor] = useState(3);
  const [sortOpen, setSortOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRevealGroup();

  const toggleCategory = (cat) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );

  const toggleSize = (size) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* Breadcrumb */}
        <div
          className="flex items-center gap-2 mb-6"
          style={{ animation: "fadeIn 0.5s ease forwards" }}
        >
          <button
            onClick={() => onNavigate("home")}
            className="text-[#555] text-xs font-display tracking-widest uppercase hover:text-accent transition-colors"
          >
            Home
          </button>
          <ChevronRight size={12} className="text-[#333]" />
          <span className="text-[#555] text-xs font-display tracking-widest uppercase">
            Collections
          </span>
          <ChevronRight size={12} className="text-[#333]" />
          <span className="text-accent text-xs font-display tracking-widest uppercase">
            Women's Summer Edit
          </span>
        </div>

        <h1
          className="font-serif text-4xl md:text-6xl font-light text-white mb-10"
          style={{ animation: "fadeUp 0.7s ease 0.1s both" }}
        >
          The Summer Edit
        </h1>

        <div className="flex gap-10">
          {/* Sidebar filters */}
          <aside className="hidden md:block w-44 flex-shrink-0">
            <div className="flex items-center justify-between mb-6">
              <span className="section-label">Filters</span>
              <button className="text-[#666] text-xs hover:text-accent transition-colors">
                Clear All
              </button>
            </div>

            {/* Category */}
            <div className="mb-7">
              <h4 className="text-[#aaa] text-xs font-display tracking-widest uppercase mb-3">
                Category
              </h4>
              <ul className="space-y-2">
                {categories.map(({ label, count }) => (
                  <li key={label} className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCategory(label)}
                      className={`w-4 h-4 border flex items-center justify-center transition-all ${
                        selectedCategories.includes(label)
                          ? "border-accent bg-accent"
                          : "border-[#333] hover:border-[#555]"
                      }`}
                    >
                      {selectedCategories.includes(label) && (
                        <X size={10} className="text-black" />
                      )}
                    </button>
                    <span
                      className={`text-xs ${selectedCategories.includes(label) ? "text-accent" : "text-[#888]"}`}
                    >
                      {label} ({count})
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div className="mb-7">
              <h4 className="text-[#aaa] text-xs font-display tracking-widest uppercase mb-4">
                Price
              </h4>
              <input
                type="range"
                min={0}
                max={100}
                value={priceRange}
                onChange={(e) => setPriceRange(+e.target.value)}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <div className="flex justify-between text-[#555] text-xs mt-2">
                <span>$0</span>
                <span>$5,000+</span>
              </div>
            </div>

            {/* Size */}
            <div className="mb-7">
              <h4 className="text-[#aaa] text-xs font-display tracking-widest uppercase mb-3">
                Size
              </h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`w-9 h-8 border text-xs font-display transition-all duration-200 ${
                      selectedSizes.includes(size)
                        ? "border-accent text-accent bg-accent/10"
                        : "border-[#2a2a2a] text-[#777] hover:border-[#444]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-7">
              <h4 className="text-[#aaa] text-xs font-display tracking-widest uppercase mb-3">
                Color
              </h4>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedColor === i
                        ? "border-accent scale-110"
                        : "border-[#2a2a2a]"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </aside>

          {/* Main grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#666] text-sm">
                Showing <span className="text-white">24</span> of{" "}
                <span className="text-white">276</span> Products
              </p>
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors font-display"
                  onClick={() => setSortOpen(!sortOpen)}
                >
                  Sort by: <span className="text-accent">New Arrivals</span>
                  <ChevronDown size={14} />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-8 w-44 bg-[#1a1a1a] border border-[#2a2a2a] z-20 py-1">
                    {[
                      "New Arrivals",
                      "Price: Low-High",
                      "Price: High-Low",
                      "Best Sellers",
                    ].map((opt) => (
                      <button
                        key={opt}
                        className="w-full text-left px-4 py-2 text-sm text-[#888] hover:text-white hover:bg-[#222] transition-colors"
                        onClick={() => setSortOpen(false)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products */}
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {collectionProducts.map((product, i) => (
                <div
                  key={product.id}
                  className={`product-card cursor-pointer animate-reveal stagger-${(i % 4) + 1}`}
                  onClick={() => onNavigate("product")}
                >
                  <div className="img-hover-zoom">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-[3/4] object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="section-label text-[0.6rem] mb-1">
                      {product.tag}
                    </p>
                    <p className="text-white text-sm font-light mb-1">
                      {product.name}
                    </p>
                    <p className="text-accent text-sm">
                      {product.currency}
                      {product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-12">
              <button className="w-9 h-9 border border-[#2a2a2a] flex items-center justify-center text-[#777] hover:border-accent hover:text-accent transition-all">
                <ChevronLeft size={14} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-9 h-9 border text-sm font-display transition-all ${
                    currentPage === p
                      ? "border-accent bg-accent text-black"
                      : "border-[#2a2a2a] text-[#777] hover:border-[#555]"
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="text-[#444] px-1">...</span>
              <button className="w-9 h-9 border border-[#2a2a2a] text-sm font-display text-[#777] hover:border-[#555] transition-all">
                12
              </button>
              <button className="w-9 h-9 border border-[#2a2a2a] flex items-center justify-center text-[#777] hover:border-accent hover:text-accent transition-all">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
