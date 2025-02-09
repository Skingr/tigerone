// import type { Config } from "tailwindcss";

// tailwind.config.ts
import type { Config } from 'tailwindcss'


const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			crimsonPro: [
  				'Crimson Pro',
  				'serif'
  			],
  			bebas: [
  				'var(--font-bebas-neue)'
  			],
  			'geist-sans': [
  				'var(--font-geist-sans)'
  			],
  			'geist-mono': [
  				'var(--font-geist-mono)'
  			]
  		},
  		colors: {
  			'cc-gold': '#BD9B1B',
  			'cc-gold-light': '#D9BF5C',
  			'cc-charcoal': '#2B2B2B',
  			'cc-gold-faint': '#FFF9E6',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
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
