// 반응형 breakpoint 상수
export const BREAKPOINTS = {
  APP: 'app', // 1024px 미만 (모바일/태블릿)
  DESKTOP: 'desktop', // 1024px 이상 (데스크톱)
}

// Tailwind CSS 클래스 헬퍼
export const breakpointClasses = {
  // 앱 전용 스타일 (1024px 미만)
  app: {
    hidden: 'app:hidden',
    block: 'app:block',
    flex: 'app:flex',
    grid: 'app:grid',
    // 레이아웃
    container: 'app:container app:mx-auto app:px-4',
    // 텍스트
    text: {
      xs: 'app:text-xs',
      sm: 'app:text-sm',
      base: 'app:text-base',
      lg: 'app:text-lg',
      xl: 'app:text-xl',
      '2xl': 'app:text-2xl',
    },
    // 패딩
    padding: {
      xs: 'app:p-2',
      sm: 'app:p-4',
      md: 'app:p-6',
      lg: 'app:p-8',
    },
    // 마진
    margin: {
      xs: 'app:m-2',
      sm: 'app:m-4',
      md: 'app:m-6',
      lg: 'app:m-8',
    },
  },

  // 데스크톱 전용 스타일 (1024px 이상)
  desktop: {
    hidden: 'desktop:hidden',
    block: 'desktop:block',
    flex: 'desktop:flex',
    grid: 'desktop:grid',
    // 레이아웃
    container: 'desktop:container desktop:mx-auto desktop:px-6',
    // 텍스트
    text: {
      xs: 'desktop:text-xs',
      sm: 'desktop:text-sm',
      base: 'desktop:text-base',
      lg: 'desktop:text-lg',
      xl: 'desktop:text-xl',
      '2xl': 'desktop:text-2xl',
      '3xl': 'desktop:text-3xl',
    },
    // 패딩
    padding: {
      xs: 'desktop:p-4',
      sm: 'desktop:p-6',
      md: 'desktop:p-8',
      lg: 'desktop:p-12',
    },
    // 마진
    margin: {
      xs: 'desktop:m-4',
      sm: 'desktop:m-6',
      md: 'desktop:m-8',
      lg: 'desktop:m-12',
    },
  },
}

// 반응형 유틸리티 함수
export const responsive = {
  // 앱에서만 보이기
  showOnApp: (classes) => `app:${classes} desktop:hidden`,

  // 데스크톱에서만 보이기
  showOnDesktop: (classes) => `hidden desktop:${classes}`,

  // 모든 화면에서 보이기
  showOnAll: (appClasses, desktopClasses) => `${appClasses} desktop:${desktopClasses}`,

  // 조건부 스타일링
  conditional: (condition, appClasses, desktopClasses) => {
    return condition ? appClasses : desktopClasses
  },
}

// 미디어 쿼리 헬퍼
export const mediaQueries = {
  isApp: () => window.innerWidth < 1024,
  isDesktop: () => window.innerWidth >= 1024,

  // 리스너 등록
  onResize: (callback) => {
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
  },
}
