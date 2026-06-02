import { Globe, Share2, Camera } from "lucide-react";

export default function Footer({ variant = "full", onNavigate }) {
  if (variant === "minimal") {
    return (
      <footer className="border-t border-[#1f1f1f] mt-24 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[#555] text-xs font-display tracking-wide">
            © 2024 Bharat Bazaar. All rights reserved.
          </span>

          <div className="flex items-center gap-6">
            <button className="text-[#555] hover:text-[#888] transition-colors text-xs font-display tracking-widest uppercase">
              Privacy Policy
            </button>

            <button className="text-[#555] hover:text-[#888] transition-colors text-xs font-display tracking-widest uppercase">
              Terms of Service
            </button>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-[#1f1f1f] mt-24 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => onNavigate?.("home")}
              className="font-serif text-xl text-accent mb-4 block hover:opacity-80 transition-opacity"
            >
              Bharat Bazaar
            </button>

            <p className="text-[#666] text-sm leading-relaxed mb-6">
              Redefining modern luxury through curated design and ethical
              production since 2024.
            </p>

            <div className="flex gap-3">
              <button className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center text-[#666] hover:border-accent hover:text-accent transition-all">
                <Globe size={14} />
              </button>

              <button className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center text-[#666] hover:border-accent hover:text-accent transition-all">
                <Share2 size={14} />
              </button>

              <button className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center text-[#666] hover:border-accent hover:text-accent transition-all">
                <Camera size={14} />
              </button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="section-label mb-5">Shop</h4>

            <ul className="space-y-3">
              {["New Arrivals", "All Collections", "Best Sellers", "Sale"].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => onNavigate?.("collection")}
                      className="text-[#888] hover:text-white text-sm transition-colors font-sans"
                    >
                      {item}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="section-label mb-5">Company</h4>

            <ul className="space-y-3">
              {[
                "About Us",
                "Sustainability",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <button className="text-[#888] hover:text-white text-sm transition-colors font-sans">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="section-label mb-5">Support</h4>

            <ul className="space-y-3">
              {["Shipping & Returns", "Size Guide", "Contact Us", "FAQ"].map(
                (item) => (
                  <li key={item}>
                    <button className="text-[#888] hover:text-white text-sm transition-colors font-sans">
                      {item}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-[#444] text-xs font-display tracking-wide">
            © 2024 Bharat Bazaar. All rights reserved.
          </span>

          <div className="flex gap-3">
            <button className="w-7 h-7 border border-[#222] flex items-center justify-center text-[#555] hover:border-accent hover:text-accent transition-all">
              <Globe size={12} />
            </button>

            <button className="w-7 h-7 border border-[#222] flex items-center justify-center text-[#555] hover:border-accent hover:text-accent transition-all">
              <Share2 size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
