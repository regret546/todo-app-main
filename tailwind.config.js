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
    },
  },
  plugins: [],
};
