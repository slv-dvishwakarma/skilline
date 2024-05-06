import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        tertiary: 'var(--tertiary-color)',
        dark_text: 'var(--dark_text)',
        light_text: 'var(--light_text)',
        footer_bg: 'var(--footer_bg)',
        paragraph: 'var(--paragraph)',
        section: 'var(--section_bg)',
        blog_title: 'var(--blog_title)'
      },
      keyframes: {
        slideInDown: {
          from: {
            transform: 'translate3d(0, -100%, 0)',
            visibility: 'visible',
          },
          to: {
            transform: 'translateZ(0)',
          },
        },
        slideIn: {
          from: {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(0%)',
          },
        },
        slideOut: {
          from: {
            transform: 'translateX(0%)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
      },
      animation: {
        animateSlideInDown: 'slideInDown 1s ease',
        animateslideIn: 'slideIn 1s ease',
        animateslideOut: 'slideOut 1s ease',
      },
    },
  },
  plugins: [],
};
export default config;
