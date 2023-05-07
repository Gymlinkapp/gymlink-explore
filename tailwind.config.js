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
        "dark-500": "#070707",
        "dark-400": "#1E1E1E",
        "dark-300": "#444444",
        "light-500": "#fff",
        "light-400": "#CCC9C9",
        accent: "#724CF9",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      keyframes: {
        // fade in
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        moveIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        skeletonLoading: {
          "0%": {
            opacity: "0.5",
          },
          "100%": {
            opacity: "1",
          },
        }
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        moveIn: "moveIn 0.5s ease-in-out",
        skeletonLoading: "skeletonLoading 1s ease-in-out infinite",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ffffff",
          secondary: "#1E1E1E",
          accent: "#724CF9",
          neutral: "#1E1E1E",
          "base-100": "#444444",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
