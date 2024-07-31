import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#32C0C6",
        placeholder: "#8C8C8C",
        border: "#E3E6E9",
        line: "#E3E6E9",
        greyNeutral: "#616161",
        greyDark: "#4E4E4E",
        whiteBackgroundMatte: "#F3F3F5"
      }
    },
  },
  plugins: [],
};
export default config;
