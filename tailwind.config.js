/** @type {import('tailwindcss').Config} */
const defaultConfig = require("shadcn/ui/tailwind.config")

module.exports = {
  ...defaultConfig,
  content: ["./resources/**/*.blade.php", "./resources/**/*.js", "./resources/**/*.vue", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    ...defaultConfig.theme,
    extend: {
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        "qserver-pink": "#ff69b4", // Custom color from the provided image
        "qserver-teal": "#20c997", // Example teal for buttons
        "qserver-yellow": "#ffc107", // Example yellow for buttons
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [...defaultConfig.plugins],
}
