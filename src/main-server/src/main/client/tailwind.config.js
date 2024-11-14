import {nextui} from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|avatar|badge|button|card|checkbox|chip|code|date-input|date-picker|dropdown|image|input|kbd|link|modal|navbar|pagination|radio|select|snippet|toggle|table|tabs|popover|divider|ripple|spinner|calendar|menu|listbox|scroll-shadow|spacer).js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui",
      addCommonColors: false, // Avoid overriding built-in colors like "blue", "green"
      defaultTheme: "light",
      defaultExtendTheme: "light",
      themes: {
        light: {
          layout: {
            background: "#F4D9D0", // Pale Pink for light theme background
            cardBackground: "#D9ABAB", // Soft Blush for cards/sections
          },
          colors: {
            primary: "#921A40", // Deep Maroon for primary elements
            secondary: "#C75B7A", // Muted Pink for highlights
            textPrimary: "#F8F1F1", // Off-white for text on primary elements
            textSecondary: "#2E2E2E", // Charcoal Gray for regular text
            headline: "#1A1A1A", // Soft Black for headings
            buttonText: "#F8F1F1", // Off-white for buttons
            borderColor: "#C4C4C4", // Light Gray for borders/dividers
            accent: "#F5E9E2", // Warm Beige for badges or highlights
            // Custom accents for each card
            cardAccent1: "#C75B7A", // Muted Pink for Medical Case
            cardAccent2: "#F5E9E2", // Warm Beige for Questionnaire
            cardAccent3: "#921A40", // Deep Maroon for Appointment
            cardAccent4: "#D9ABAB", // Soft Blush for Chat with Doctor
          },
        },
        dark: {
          layout: {
            background: "#1A1A1A", // Dark background for the dark theme
            cardBackground: "#2E2E2E", // Darker card background
          },
          colors: {
            primary: "#C75B7A", // Muted Pink as primary in dark mode
            secondary: "#F4D9D0", // Pale Pink for accents
            textPrimary: "#F5E9E2", // Warm Beige for text
            headline: "#D9ABAB", // Soft Blush for headings
            buttonText: "#F5E9E2", // Warm Beige for buttons
            borderColor: "#4A4A4A", // Dark Gray for dividers
            accent: "#D9ABAB", // Soft Blush for badges
            // Custom accents for each card
            cardAccent1: "#C75B7A",
            cardAccent2: "#F5E9E2",
            cardAccent3: "#921A40",
            cardAccent4: "#D9ABAB",
          },
        },
      },
    }),
  ],
};
