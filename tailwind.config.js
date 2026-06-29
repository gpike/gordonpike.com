/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#0D0D0D',
          secondary: '#594438',
          accent: '#BFAEA8',
          neutral: '#BF8B5E',
          'base-100': '#F2F2F2',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: '#0D0D0D',
        secondary: '#594438',
        tertiary: '#BFAEA8',
        alternate: '#F2F2F2',
        highlight: '#BF8B5E',

        background: '#F2F2F2',
        cardback: '#F2F2F2',
        cardalternate: '#594438',
        header: '#0D0D0D',
        footer: '#0D0D0D',
      },
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
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './components/**/*.{js,vue,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
      './app.vue',
      './content/**/*.md',
    ],
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}
