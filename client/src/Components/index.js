import { ShoppingBag, Heart, User, Menu, X, Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar({ currentPage, onNavigate, cartCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);

  // Handle scroll with hide/show on scroll down/up
  useEffect(() => {
    let ticking = false;
    let lastState = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const nextState = currentScrollY > 80;

          // Hide navbar on scroll down, show on scroll up (only when scrolled past hero)
          if (currentScrollY > 200) {
            setHidden(currentScrollY > lastScrollY);
          } else {
            setHidden(false);
          }

          if (nextState !== lastState) {
            lastState = nextState;
            setScrolled(nextState);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navItems = [
    { id: "home", label: "New", path: "home" },
    { id: "collection", label: "Shop", path: "collection" },
    { id: "collections", label: "Collections", path: "collection" },
    { id: "journal", label: "Journal", path: "journal" },
  ];

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-700 ease-custom
          ${
            scrolled
              ? "bg-dark/90 backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
              : "bg-transparent"
          }
          ${hidden ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        {/* Bottom Border Line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none transition-all duration-500"
          style={{
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? "scaleX(1)" : "scaleX(0.95)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1 flex justify-start">
            <button
              onClick={() => {
                onNavigate("home");
                setMenuOpen(false);
              }}
              className="group relative font-serif text-xl md:text-2xl font-light tracking-wider text-white hover:text-accent transition-all duration-300"
            >
              Bharat Bazaar
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.path);
                }}
                className="relative text-xs uppercase tracking-[0.25em] py-2 transition-all duration-300 group"
              >
                <span
                  className={`
                    transition-colors duration-300
                    ${
                      currentPage === item.id ||
                      (item.id === "collections" &&
                        currentPage === "collection")
                        ? "text-accent"
                        : "text-neutral-400 group-hover:text-white"
                    }
                  `}
                >
                  {item.label}
                </span>
                <span
                  className={`
                    absolute bottom-0 left-0 h-px bg-accent transition-all duration-300
                    ${
                      currentPage === item.id ||
                      (item.id === "collections" &&
                        currentPage === "collection")
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }
                  `}
                />
              </button>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex-1 flex items-center justify-end gap-4 md:gap-6">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-neutral-400 hover:text-white transition-colors duration-300 p-1 relative group"
              aria-label="Search"
            >
              <Search size={19} strokeWidth={1.5} />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </button>

            {/* User Account */}
            <button
              className="text-neutral-400 hover:text-white transition-colors duration-300 p-1 relative group"
              aria-label="Account"
            >
              <User size={19} strokeWidth={1.5} />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Wishlist */}
            <button
              className="text-neutral-400 hover:text-white transition-colors duration-300 p-1 relative group"
              aria-label="Wishlist"
            >
              <Heart size={19} strokeWidth={1.5} />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Cart */}
            <button
              onClick={() => onNavigate("checkout")}
              className="text-neutral-400 hover:text-white transition-colors duration-300 p-1 relative group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-dark text-[9px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center animate-scale">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-neutral-400 hover:text-white transition-colors duration-300 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X size={22} strokeWidth={1.5} />
              ) : (
                <Menu size={22} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <div
          className={`
            absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-lg border-b border-white/10
            transition-all duration-500 ease-custom overflow-hidden
            ${searchOpen ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="max-w-2xl mx-auto px-6 py-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for products, collections, or stories..."
                className="w-full bg-card border border-white/10 rounded-sm py-3 pl-11 pr-4 text-white placeholder:text-neutral-500 focus:outline-none focus:border-accent transition-all duration-300"
                autoFocus={searchOpen}
              />
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`
            fixed inset-0 z-40 md:hidden transition-all duration-500 ease-custom
            ${menuOpen ? "visible opacity-100" : "invisible opacity-0"}
          `}
          style={{ top: "80px" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div
            className={`
              absolute right-0 top-0 bottom-0 w-80 bg-dark/95 backdrop-blur-lg
              shadow-2xl transition-transform duration-500 ease-custom
              ${menuOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <div className="flex flex-col p-8 gap-6">
              {/* User Info Section */}
              <div className="pb-6 border-b border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                    <User size={24} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Guest User</p>
                    <p className="text-neutral-500 text-xs">
                      Sign in for exclusive offers
                    </p>
                  </div>
                </div>
                <button className="w-full btn-outline text-sm py-2">
                  Sign In / Register
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.path);
                      setMenuOpen(false);
                    }}
                    className={`
                      relative text-sm uppercase tracking-[0.2em] py-2 text-left
                      transition-all duration-300 group
                      ${
                        currentPage === item.id ||
                        (item.id === "collections" &&
                          currentPage === "collection")
                          ? "text-accent"
                          : "text-neutral-300 hover:text-white"
                      }
                    `}
                    style={{
                      animation: menuOpen
                        ? `fadeUp 0.3s ease ${index * 0.05}s forwards`
                        : "none",
                      opacity: 0,
                      transform: "translateY(10px)",
                    }}
                  >
                    {item.label}
                    {(currentPage === item.id ||
                      (item.id === "collections" &&
                        currentPage === "collection")) && (
                      <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent" />
                    )}
                  </button>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="pt-6 mt-auto border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Wishlist</span>
                  <span className="text-white">0 items</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-neutral-500">Cart</span>
                  <span className="text-white">{cartCount} items</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump when navbar is fixed */}
      <div className="h-20 md:h-24" />
    </>
  );
}
