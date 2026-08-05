import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        paper: "#FFFFFF",
        accent: {
          DEFAULT: "#FF4F7B",
          soft: "#FFE4EB",
        },
        violet: {
          DEFAULT: "#7B61FF",
          soft: "#EEEAFF",
        },
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(17, 17, 17, 0.06)",
        glass: "0 8px 32px rgba(17, 17, 17, 0.08)",
      },
      backdropBlur: {
        glass: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
