import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4A73C',
      light: '#E4C06C',
      dark: '#B8963B',
      contrastText: '#0B0B0B',
    },
    secondary: {
      main: '#B8963B',
      light: '#D4A73C',
      dark: '#8A7030',
      contrastText: '#0B0B0B',
    },
    success: {
      main: '#2ECC71',
      light: '#58D68D',
      dark: '#27AE60',
    },
    warning: {
      main: '#F39C12',
      light: '#F5B041',
      dark: '#D68910',
    },
    error: {
      main: '#E74C3C',
      light: '#EC7063',
      dark: '#CB4335',
    },
    info: {
      main: '#3498DB',
      light: '#5DADE2',
      dark: '#2E86C1',
    },
    background: {
      default: '#0B0B0B',
      paper: '#151515',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#D6D6D6',
      disabled: '#9A9A9A',
    },
    divider: '#2A2A2A',
    action: {
      active: '#D4A73C',
      hover: 'rgba(212, 167, 60, 0.08)',
      selected: 'rgba(212, 167, 60, 0.16)',
      disabled: '#2A2A2A',
      disabledBackground: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#FFFFFF',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#FFFFFF',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#FFFFFF',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#FFFFFF',
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#FFFFFF',
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5,
      color: '#FFFFFF',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      color: '#D6D6D6',
    },
    body1: {
      fontSize: '0.938rem',
      color: '#D6D6D6',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#D6D6D6',
    },
    caption: {
      color: '#9A9A9A',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.3)',
    '0px 2px 6px rgba(0, 0, 0, 0.35)',
    '0px 4px 12px rgba(0, 0, 0, 0.4)',
    '0px 6px 16px rgba(0, 0, 0, 0.45)',
    '0px 8px 24px rgba(0, 0, 0, 0.5)',
    '0px 12px 32px rgba(0, 0, 0, 0.55)',
    ...Array(18).fill('0px 12px 32px rgba(0, 0, 0, 0.55)'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
        },
        contained: {
          boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #D4A73C 0%, #B8963B 100%)',
          color: '#0B0B0B',
          '&:hover': {
            background: 'linear-gradient(135deg, #E4C06C 0%, #D4A73C 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#151515',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.3)',
          border: '1px solid #2A2A2A',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#151515',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: '#2A2A2A',
        },
        head: {
          fontWeight: 600,
          backgroundColor: '#1E1E1E',
          color: '#FFFFFF',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#2A2A2A',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#151515',
          borderColor: '#2A2A2A',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#151515',
          borderColor: '#2A2A2A',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#2A2A2A',
            },
            '&:hover fieldset': {
              borderColor: '#D4A73C',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#D4A73C',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2A2A2A',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D4A73C',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D4A73C',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E1E1E',
          border: '1px solid #2A2A2A',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#151515',
          border: '1px solid #2A2A2A',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: '#2A2A2A',
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: '#D4A73C',
        },
        iconEmpty: {
          color: '#2A2A2A',
        },
      },
    },
  },
});

export default theme;
