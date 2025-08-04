/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          1: '#1C4025',
          2: '#285934',
          3: '#68A63C',
          4: '#9ccc65',
          5: '#F2F2F2',
        },
        // Status Colors
        status: {
          1: '#0D8CE7',
          2: '#DC3545',
        },
        // Text Colors
        text: {
          1: '#6B7280',
          2: '#555555',
          3: '#FFFFFF',
        },
        // Background Colors
        bg: {
          1: '#F2F2F2',
          2: '#FFFFFF',
        },
      },
      screens: {
        // 커스텀 breakpoint 설정
        app: { max: '1023px' }, // 1024px 미만 (모바일/태블릿)
        desktop: '1024px', // 1024px 이상 (데스크톱)
      },
    },
  },
  plugins: [],
}
