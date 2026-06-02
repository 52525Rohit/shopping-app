/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#0fd4bf",
          light: "#2ee5d0",
          dark: "#0bbfac",
          50: "#e6faf7",
          100: "#ccf5ef",
          200: "#99ebe0",
          300: "#66e0d0",
          400: "#33d6c1",
          500: "#0fd4bf",
          600: "#0cbaa8",
          700: "#0a9f8f",
          800: "#078576",
          900: "#056a5e",
        },
        dark: {
          DEFAULT: "#0c0c0c",
          50: "#e6e6e6",
          100: "#cccccc",
          200: "#999999",
          300: "#666666",
          400: "#333333",
          500: "#0c0c0c",
          600: "#0a0a0a",
          700: "#080808",
          800: "#060606",
          900: "#040404",
        },
        card: {
          DEFAULT: "#161616",
          light: "#1f1f1f",
          dark: "#121212",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        serif: [
          "Playfair Display",
          "Georgia",
          "Cambria",
          "Times New Roman",
          "serif",
        ],
        display: ["Montserrat", "system-ui", "sans-serif"],
        mono: [
          "SF Mono",
          "Monaco",
          "Cascadia Code",
          "Roboto Mono",
          "monospace",
        ],
      },
      fontSize: {
        xxs: ["0.625rem", { lineHeight: "0.875rem" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-left": "slideInLeft 0.6s ease-out forwards",
        "slide-right": "slideInRight 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        shimmer: "shimmer 1.5s infinite",
        scroll: "scroll 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        slideInLeft: {
          from: {
            opacity: "0",
            transform: "translateX(-30px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        slideInRight: {
          from: {
            opacity: "0",
            transform: "translateX(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        scaleIn: {
          from: {
            opacity: "0",
            transform: "scale(0.95)",
          },
          to: {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "200% 0",
          },
          "100%": {
            backgroundPosition: "-200% 0",
          },
        },
        scroll: {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(24px)",
            opacity: "0",
          },
        },
      },
      transitionTimingFunction: {
        custom: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      transitionDuration: {
        2000: "2000ms",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 20px rgba(15, 212, 191, 0.3)",
        "glow-lg": "0 0 30px rgba(15, 212, 191, 0.4)",
        "inner-dark": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)",
      },
      blur: {
        xs: "2px",
      },
      screens: {
        xs: "475px",
        "3xl": "1792px",
        "4xl": "2048px",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
    },
  },
  plugins: [
    // Add custom plugins if needed
    function ({ addUtilities, addComponents, theme }) {
      // Additional custom utilities
      addUtilities({
        ".text-shadow": {
          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
        },
        ".text-shadow-lg": {
          textShadow: "0 4px 8px rgba(0,0,0,0.5)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        },
        ".transform-3d": {
          transformStyle: "preserve-3d",
        },
      });

      // Custom components
      addComponents({
        ".container-custom": {
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: theme("spacing.6"),
          paddingRight: theme("spacing.6"),
          "@media (min-width: 640px)": {
            paddingLeft: theme("spacing.8"),
            paddingRight: theme("spacing.8"),
          },
          "@media (min-width: 1024px)": {
            paddingLeft: theme("spacing.12"),
            paddingRight: theme("spacing.12"),
          },
        },
        ".gradient-text": {
          background: "linear-gradient(135deg, #0fd4bf 0%, #0b8a7a 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        },
      });
    },
  ],
};
