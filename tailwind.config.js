/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    minWidth: {
      30: "30%",
    },
    scale: {
      101: "1.01",
    },
    extend: {
      opacity: {
        85: ".85",
      },
      spacing: {
        5: "5px",
        15: "15px",
        255: "255px",
      },
      height: {
        350: "21.875rem",
        555: "5%",
        95: "95%",
      },
      width: {
        "1/10": "10%",
        90: "90%",
        350: "21.875rem",
      },
    },
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
    },
  },
  plugins: [],
};
