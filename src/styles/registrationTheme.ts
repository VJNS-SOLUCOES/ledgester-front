import { createTheme } from '@mui/material';

const registrationTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0048D9',
          },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0048D9',
          },
          '& .MuiOutlinedInput-input': {
            padding: '8px',
          },
        },
      },
    },
  },
});

export default registrationTheme;
