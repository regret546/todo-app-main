/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "bright-blue": "hsl(220, 98%, 61%)",
        "linear-gradient-from": "hsl(192, 100%, 67%)",
        "linear-gradient-to": "hsl(280, 87%, 65%)",
        "header-color": "hsl(0, 0%, 98%)",
        "background-color": "var(--background)",
        "body-color": "var(--body)",
        "border-color": "var(--border)",
        "text-color": "var(--text)",
      },
      fontWeight: {
        "fw-bold1": 400,
        "fw-bold2": 700,
      },
      keyframes: {
        "fade-down": {
          "0%": {
            opacity: 0,
            transform: "translateY(-20px) scale(0.9)",
          },
          "100%": {
            oapcity: 1,
            transform: "translateY(0) scale(1)",
          },
        },
        "fade-up": {
          "0%": {
            opacity: 0,
            transform: "translateY(100%) scale(0.9)",
          },
          "100%": {
            oapcity: 1,
            transform: "translateY(0) scale(1)",
          },
        },
        "rotate-360": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        "fade-down": "fade-down 200ms ease-in-out",
        "fade-up": "fade-down 200ms ease-in-out",
        "rotate-360": "rotate-360 500ms ease-in-out",
      },
    },
  },
  plugins: [],
};
