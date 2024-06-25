import { createTheme } from '@mui/material';

const sideBarTheme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&.MuiAccordion-root': {
            boxShadow: `none !important`,
          },
          '&.MuiAccordion-root::before': {
            display: `none !important`,
          },
          '&.MuiAccordion-root.Mui-expanded': {
            margin: '0',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          '&.MuiAccordionSummary-root': {
            backgroundColor: `#0d245e !important`,
            padding: '0px 9px',
          },
          '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: '12px 0',
          },
          '&.MuiAccordionSummary-root.Mui-expanded': {
            minHeight: '48px',
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          '&.MuiAccordionDetails-root': {
            backgroundColor: 'rgba(13,36,94,0.95)',
            padding: '10px 0px',
          },
        },
      },
    },
  },
});

export default sideBarTheme;
