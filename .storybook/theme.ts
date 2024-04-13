import { create } from '@storybook/theming/create';

const COLORS = {
  bg: '#272525',
  fg: '#ffedcf',
  highlight: '#f79e31',
}

export default create({
  base: 'dark',
  brandTitle: 'nbody.js',
  brandUrl: 'https://source-academy.github.io/nbody/',
  brandImage: 'https://i.imgur.com/b7Nb1M5.png',
  brandTarget: '_self',

  appBg: COLORS.bg,
  barBg: COLORS.bg,
  barHoverColor: COLORS.fg,
  barSelectedColor: COLORS.highlight,
  colorPrimary: COLORS.fg,
  colorSecondary: COLORS.highlight,
});