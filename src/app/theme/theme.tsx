import { createTheme, ThemeOptions } from '@mui/material/styles';

// Black and gold theme configuration
const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#D4AF37', // Gold
            light: '#F5D76E',
            dark: '#B8860B',
            contrastText: '#000000',
        },
        secondary: {
            main: '#212121', // Dark gray (almost black)
            light: '#484848',
            dark: '#000000',
            contrastText: '#ffffff',
        },
        background: {
            default: '#121212',
            paper: '#1E1E1E',
        },
        text: {
            primary: '#ffffff',
            secondary: '#D4AF37', // Gold for secondary text
        },
        divider: 'rgba(212, 175, 55, 0.3)', // Semi-transparent gold for dividers
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 600,
        },
        h2: {
            fontWeight: 600,
        },
        h3: {
            fontWeight: 600,
        },
        button: {
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    padding: '10px 24px',
                },
                contained: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 8px rgba(212, 175, 55, 0.25)',
                    },
                },
                outlined: {
                    borderWidth: 2,
                    '&:hover': {
                        borderWidth: 2,
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#121212',
                    backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.15), rgba(212, 175, 55, 0))',
                },
            },
        },
    },
};

const theme = createTheme(themeOptions);

export default theme;