module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      colors: {
        primary: '#B2A0D9',
        secondary: '#B8B0D9',
        tertiary: '#C5CED9',
        quaternary: '#F2F2F2',
        quinary: '#2AA4BF',

        background: '#F2F2F2',
        highlight: '#C5CED9',
        alternate: '#B2A0D9',
        cardback: '#F2F2F2',
        cardalternate: '#B8B0D9',
        header: '#2AA4BF',
        footer: '#2AA4BF',
      },

      // primary: '#2E83F2',
      // secondary: '#2E97F2',
      // tertiary: '#0D1A26',
      // quaternary: '#16F2F2',
      // quinary: '#1B618C',

      // background: '#0D1A26',
      // highlight: '#2E97F2',
      // alternate: '#1B618C',
      // cardback: '#E9EFF2',
      // cardalternate: '#D1D5DB'

      //       /* Color Theme Swatches in Hex */
      // $Crevasse-1-hex: #B4BEC9;
      // $Crevasse-2-hex: #159A9C;
      // $Crevasse-3-hex: #002333;
      // $Crevasse-4-hex: #DEEFE7;
      // $Crevasse-5-hex: #FFFFFF;
      // /* Color Theme Swatches in Hex */
      // $Widescape-1-hex: #EBF0F2;
      // $Widescape-2-hex: #5C6F73;
      // $Widescape-3-hex: #8FA1A6;
      // $Widescape-4-hex: #313E40;
      // $Widescape-5-hex: #D9D9D9;
      /* Color Theme Swatches in Hex */
      // $Appygas-1-hex: #B2A0D9;
      // $Appygas-2-hex: #B8B0D9;
      // $Appygas-3-hex: #C5CED9;
      // $Appygas-4-hex: #F2F2F2;
      // $Appygas-5-hex: #2AA4BF;

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
      body: ['Poppins', '-apple-system', 'BlinkMacSystemFont'],
      // 'display': ['Oswald'],
      // 'body': ['Open Sans'],
    },
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
