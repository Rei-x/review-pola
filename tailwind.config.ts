import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {

  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			'dun': { DEFAULT: '#c3bdac', 100: '#2b271f', 200: '#554f3e', 300: '#80765d', 400: '#a49b82', 500: '#c3bdac', 600: '#cfcabd', 700: '#dbd7cd', 800: '#e7e5de', 900: '#f3f2ee' },
			'pakistan_green': { DEFAULT: '#203508', 100: '#060b02', 200: '#0d1503', 300: '#132005', 400: '#1a2b06', 500: '#203508', 600: '#4f8314', 700: '#7ed11f', 800: '#aae863', 900: '#d4f3b1' },
			'ivory': { DEFAULT: '#f2f2e3', 100: '#40401e', 200: '#81813b', 300: '#b7b762', 400: '#d5d5a3', 500: '#f2f2e3', 600: '#f5f5e9', 700: '#f7f7ee', 800: '#fafaf4', 900: '#fcfcf9' },
			'old_rose': { DEFAULT: '#af7a6d', 100: '#251814', 200: '#4a2f29', 300: '#6f473d', 400: '#935e51', 500: '#af7a6d', 600: '#bf968b', 700: '#cfb0a8', 800: '#dfcac5', 900: '#efe5e2' },
			'smoky_black': { DEFAULT: '#0d0807', 100: '#030201', 200: '#050303', 300: '#080504', 400: '#0b0706', 500: '#0d0807', 600: '#4d2f29', 700: '#8d564c', 800: '#ba8980', 900: '#ddc4bf' }
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
	// eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
export default config;
