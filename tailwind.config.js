export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Baloo 2"', 'Fredoka', 'Poppins', 'sans-serif'],
        rounded: ['Fredoka', 'Nunito', 'Poppins', 'sans-serif'],
        body: ['Nunito', 'Poppins', 'sans-serif']
      },
      colors: {
        cream: '#fff8ee',
        biscuit: '#f2dcc3',
        caramel: '#c88643',
        peach: '#ffb79b',
        paw: '#7d4e2d',
        sky: '#a8dcf0',
        mint: '#a8e3c3',
        cocoa: '#3a261d'
      },
      boxShadow: {
        glow: '0 22px 70px rgba(255, 145, 85, 0.28)',
        card: '0 24px 80px rgba(78, 50, 29, 0.13)'
      },
      backgroundImage: {
        'paw-radial': 'radial-gradient(circle at 25% 15%, rgba(255,183,155,.55), transparent 28%), radial-gradient(circle at 78% 20%, rgba(168,220,240,.55), transparent 24%), linear-gradient(135deg, #fff8ee, #fff1df 48%, #eaf8f1)'
      }
    }
  },
  plugins: []
};
