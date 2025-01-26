// import type { Config } from "tailwindcss";

// tailwind.config.ts
import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        crimsonPro: ['Crimson Pro', 'serif'],
      },
      colors: {
        'cc-gold': '#BD9B1B',
        'cc-gold-light': '#D9BF5C',
        'cc-charcoal': '#2B2B2B',
        'cc-gold-faint' : '#FFF9E6',
      },
    },
  },
  plugins: [],
}
export default config



// const config Config = {
//   content: [
        //  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        //  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        //  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      //  ],
// }
// theme: {
//   extend: {
//     colors: {
//       'cc-gold': '#BD9B1B',
//       'cc-gold-light': '#D9BF5C',
//       'cc-charcoal': '#2B2B2B',
//       // Feel free to add more specific tints/shades as needed
//     },
//   },
// },
// plugins: [],
// }
// export default {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//     },
//   },
//   plugins: [],
// } satisfies Config;
