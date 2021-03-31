module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      colors: {
        primary: '#2E83F2',
        secondary: '#2E97F2',
        tertiary: '#0D1A26',
        quaternary: '#16F2F2',
        quinary: '#1B618C',

        background: '#0D1A26',
        highlight: '#2E97F2',
        alternate: '#1B618C',
        cardback: '#E9EFF2',
        cardalternate: '#D1D5DB'
      }

      // primary: '#0F5FA6',
      // secondary: '#36ABD9',
      // tertiary: '#177FBF',
      // quaternary: '#C1D4D9',
      // quinary: '#080C26',

      // background: '#080C26',
      // highlight: '#5679A6',
      // alternate: '#263F73'


      // colors: {
      //   primary: '#D97398',
      //   secondary: '#A65398',
      //   background: '#222059',
      //   alternate: '#263F73',
      //   highlight: '#5679A6'
      // }

      // colors: {
      //   primary: '#67428C',
      //   secondary: '#85A6A6',
      //   background: '#151426',
      //   alternate: '#563973',
      //   highlight: '#F2F2F2'
      // }
    },
    fontFamily: {
      sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont'],
      serif: ['Georgia', 'Cambria'],
      mono: ['SFMono-Regular', 'Menlo'],
      display: ['"Roboto Slab"', '-apple-system', 'BlinkMacSystemFont'],
      body: ['Poppins', '-apple-system', 'BlinkMacSystemFont']
      // 'display': ['Oswald'],
      // 'body': ['Open Sans'],
    }
  },
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  variants: {},
  plugins: [],
}
