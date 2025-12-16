import { defineStore } from 'pinia'
const useSystemStore = defineStore('system', {
  state: () => ({
    isLoading: false,
    isLogin: false,
    isMobile: false,
    isDesktop: false,
    isTablet: false,
    isLandscape: false,
    isPortrait: false,
    isDark: false,
    isLight: false,
    isDarkMode: false,
    isLightMode: false,
    count: 222,
    slogan: 'Hello p'
  })
})
export default useSystemStore