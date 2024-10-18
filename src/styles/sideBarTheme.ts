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
            backgroundColor: `#0078FF !important`,
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
            backgroundColor: '#006CE5',
            padding: '0px 0px',
            boxShadow: 'inset 0px 0px 42px -35px rgba(0,0,0,1)',
          },
        },
      },
    },
  },
});

export default sideBarTheme;
