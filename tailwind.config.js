/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        // 커스텀 breakpoint 설정
        app: { max: '1023px' }, // 1024px 미만 (모바일/태블릿)
        desktop: '1024px', // 1024px 이상 (데스크톱)
      },
    },
  },
  plugins: [],
}
