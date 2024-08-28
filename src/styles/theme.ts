import {} from './t';

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { ptBR } from '@mui/material/locale';

const theme = createTheme(
  {
    components: {
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
    },
    palette: {
      alert: {
        main: '#FFA217',
      },
      orange: {
        main: '#FD4F00',
      },
      green: {
        main: '#005D63',
      },
      primary: {
        main: '#0078FF',
      },
      secondary: {
        main: '#000000',
      },
      white: {
        main: '#FFFFFF',
      },
      w_high: {
        main: '#DDDDDD',
      },
      white_transparent: {
        main: 'rgba(255, 255, 255, 0.3)',
      },
      error: {
        main: red.A400,
      },
      gray: {
        main: '#e9eaf0',
      },
    },
  },
  ptBR,
);

export default theme;
