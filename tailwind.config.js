/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#9f8054",
          dark: "#82683f",
          light: "#caaf8a",
        },
        secondary: {
          DEFAULT: "#344054",
          dark: "#1d2939",
          light: "#667085",
        },
        background: "#FFFFFF",
        foreground: "#101828",
        muted: {
          DEFAULT: "#f8f9fc",
          foreground: "#667085",
        },
        accent: {
          DEFAULT: "#d0a456",
          dark: "#b78a3d",
          light: "#e3c182",
        },
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        border: "#EAECF0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 4px 12px rgba(0, 0, 0, 0.04)",
        md: "0 8px 24px rgba(0, 0, 0, 0.08)",
        lg: "0 16px 32px rgba(0, 0, 0, 0.12)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "#101828",
            h1: {
              fontFamily: "Playfair Display, Georgia, serif",
            },
            h2: {
              fontFamily: "Playfair Display, Georgia, serif",
            },
            h3: {
              fontFamily: "Playfair Display, Georgia, serif",
            },
            h4: {
              fontFamily: "Playfair Display, Georgia, serif",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
