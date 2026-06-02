import { ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar({ currentPage, onNavigate, cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastState = false;

    const handleScroll = () => {
      const nextState = window.scrollY > 80;

      if (nextState !== lastState) {
        lastState = nextState;
        setScrolled(nextState);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
    fixed top-0 left-0 right-0 z-50
    transition-[background-color,box-shadow]
    duration-700
    ease-[cubic-bezier(0.22,1,0.36,1)]
    ${
      scrolled
        ? "bg-black/75 shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
        : "bg-transparent shadow-none"
    }
  `}
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 pointer-events-none"
        style={{
          transitionProperty: "opacity, transform",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "500ms",
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "scaleX(1)" : "scaleX(0.95)",
        }}
      />

      {/* Increased height layout to h-24 (96px) */}
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => onNavigate("home")}
            className="font-serif text-xl md:text-2xl font-light tracking-wider text-white hover:text-accent"
            style={{
              transitionProperty: "all",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDuration: "300ms",
            }}
          >
            Bharat Bazaar{" "}
          </button>
        </div>

        {/* Center: Main Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-12 justify-center">
          <button
            onClick={() => onNavigate("home")}
            className="text-xs uppercase tracking-[0.25em] pb-1.5 border-b-2"
            style={{
              transitionProperty: "all",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDuration: "300ms",
              color:
                currentPage === "home"
                  ? "var(--color-accent, #5eead4)"
                  : "#d4d4d4",
              borderColor:
                currentPage === "home"
                  ? "var(--color-accent, #5eead4)"
                  : "transparent",
            }}
          >
            New
          </button>

          <button
            onClick={() => onNavigate("collection")}
            className="text-xs uppercase tracking-[0.25em] pb-1.5 border-b-2"
            style={{
              transitionProperty: "all",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDuration: "300ms",
              color:
                currentPage === "collection"
                  ? "var(--color-accent, #5eead4)"
                  : "#d4d4d4",
              borderColor:
                currentPage === "collection"
                  ? "var(--color-accent, #5eead4)"
                  : "transparent",
            }}
          >
            Shop
          </button>

          <button
            onClick={() => onNavigate("collection")}
            className="text-xs uppercase tracking-[0.25em] text-neutral-300 hover:text-white pb-1.5 border-b-2 border-transparent"
            style={{
              transitionProperty: "all",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              transitionDuration: "300ms",
            }}
          >
            Collections
          </button>
        </nav>

        {/* Right: Functional Icons */}
        <div className="flex-1 flex items-center justify-end gap-6">
          <button
            className="text-neutral-400 hover:text-white p-1"
            style={{ transition: "color 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            <User size={19} strokeWidth={1.5} />
          </button>

          <button
            className="text-neutral-400 hover:text-white p-1"
            style={{ transition: "color 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            <Heart size={19} strokeWidth={1.5} />
          </button>

          <button
            onClick={() => onNavigate("checkout")}
            className="text-neutral-400 hover:text-white p-1 relative"
            style={{ transition: "color 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            <ShoppingBag size={19} strokeWidth={1.5} />

            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-[#0c0c0c] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Collapse Menu Button Trigger */}
          <button
            className="md:hidden text-neutral-400 hover:text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ transition: "color 300ms cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
            {menuOpen ? (
              <X size={22} strokeWidth={1.5} />
            ) : (
              <Menu size={22} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel Dropdown */}
      <div
        className="md:hidden overflow-hidden bg-black/90 backdrop-blur-lg relative"
        style={{
          transitionProperty: "all",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDuration: "400ms",
          maxHeight: menuOpen ? "240px" : "0px",
          opacity: menuOpen ? "1" : "0",
        }}
      >
        {/* Secondary inner smooth border line for the mobile open drawer menu */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/5" />

        <div className="flex flex-col px-8 py-6 gap-5">
          <button
            onClick={() => {
              onNavigate("home");
              setMenuOpen(false);
            }}
            className="text-xs uppercase tracking-[0.20em] text-left"
            style={{
              color:
                currentPage === "home"
                  ? "var(--color-accent, #5eead4)"
                  : "#d4d4d4",
            }}
          >
            New
          </button>

          <button
            onClick={() => {
              onNavigate("collection");
              setMenuOpen(false);
            }}
            className="text-xs uppercase tracking-[0.20em] text-left"
            style={{
              color:
                currentPage === "collection"
                  ? "var(--color-accent, #5eead4)"
                  : "#d4d4d4",
            }}
          >
            Shop
          </button>

          <button
            onClick={() => {
              onNavigate("collection");
              setMenuOpen(false);
            }}
            className="text-xs uppercase tracking-[0.20em] text-neutral-300 text-left"
          >
            Collections
          </button>
        </div>
      </div>
    </header>
  );
}
