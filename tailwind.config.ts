import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
      fontSize: {
        m: "14px",
        xs: "12px",
        mMedium: "14px",
      },
      lineHeight: {
        m: "19px",
        xs: "17px",
        mMedium: "19px",
      },
      fontWeight: {
        m: "400",
        mMedium: "500",
        xs: "400",
      },
      colors: {
        primaryGreen: "#52FA18",
        borderColor: "#323232",
        bgDark: "#181818",
        bgDarker: "#0A0A0A",
        bgLighter: "#1E1E1E",
        textGray: "#999",
        textWhite: "#F3F5F7",
      },
    },
  },
  plugins: [],
} satisfies Config;
