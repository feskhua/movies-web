import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        'screen-minus-128': 'calc(100vh - 128px)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      screens: {
        sm: '360px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      spacing: {
        11.25: '45px',
        13.5: '54px',
        30: '120px',
        50.5: '202px',
        100: '400px',
        118.25: '473px',
        126: '504px',
      },
      fontSize: {
        'heading-one': ['64px', { lineHeight: '80px' }],
        'heading-two': ['48px', { lineHeight: '56px' }],
        'heading-three': ['32px', { lineHeight: '40px' }],
        'heading-four': ['24px', { lineHeight: '32px' }],
        'heading-five': ['20px', { lineHeight: '24px' }],
        'heading-six': ['16px', { lineHeight: '24px' }],
        'body-large': ['20px', { lineHeight: '24px' }],
        'body-regular': ['16px', { lineHeight: '24px' }],
        'body-small': ['14px', { lineHeight: '24px' }],
        'body-extra-small': ['12px', { lineHeight: '24px' }],
        'caption': ['14px', { lineHeight: '16px' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      aspectRatio: {
        '24/25': '24 / 25',
      },
      borderRadius: {
        'lg2': '0.625rem'
      },
      colors: {
        foreground: "var(--foreground)",
        primary: '#2BD17E',
        error: '#EB5757',
        background: '#093545',
        input: '#224957',
        card: '#092C39',
        'background-light': '#254e57',
        'background-dark': '#002d38',
        'hover-color': '#0829358C',
      },
    },
  },
  plugins: [],
};
export default config;
