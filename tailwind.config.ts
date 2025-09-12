import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-gradient-to-r",
    // Primary (Blue)
    "from-[#13ADC7]",
    "via-[#15B8D4]",
    "to-[#18C3E1]/50",
    // Secondary (Purple)
    "from-[#945DD6]",
    "via-[#A66DE8]",
    "to-[#B87DFA]/50",
    // Accent (Orange)
    "from-[#F46737]",
    "via-[#F87D54]",
    "to-[#FC9371]/50",
    // AI/ML (Blue)
    "from-[#3B82F6]",
    "via-[#60A5FA]",
    "to-[#93C5FD]/50",
    // Opacity
    "opacity-90",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
      colors: {
        background: {
          DEFAULT: "#0F1624",
          light: "#171F38",
          dark: "#0A0F1A",
          card: "#212D45",
        },
        primary: {
          light: "#1AC7E4",
          DEFAULT: "#13ADC7",
          dark: "#0D8A9E",
        },
        secondary: {
          light: "#A674E8",
          DEFAULT: "#945DD6",
          dark: "#7A4CB8",
        },
        accent: {
          light: "#FF7B4A",
          DEFAULT: "#F46737",
          dark: "#D65228",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(270deg, var(--tw-gradient-stops))",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      boxShadow: {
        "glow-primary": "0 0 20px rgba(19, 173, 199, 0.35)",
        "glow-secondary": "0 0 20px rgba(148, 93, 214, 0.35)",
        "glow-accent": "0 0 20px rgba(244, 103, 55, 0.35)",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      blur: {
        "xs": "2px",
      },
      backdropBlur: {
        "xs": "2px",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [],
};

export default config;
