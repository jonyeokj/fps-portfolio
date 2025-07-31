import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular'],
      },
    },
  },
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
};

export default config;
