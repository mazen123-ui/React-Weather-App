import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeToggleContext = createContext();

export default function AppThemeProvider({ children }) {
  // Check local storage for saved theme, default to dark
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#f0f4f8",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#1a2027",
                  secondary: "#5f6368",
                },
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#b0bec5",
                },
              }),
        },
        typography: {
          fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                borderRadius: 16,
                boxShadow:
                  mode === "light"
                    ? "0 8px 32px rgba(0, 0, 0, 0.05)"
                    : "0 8px 32px rgba(0, 0, 0, 0.4)",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeToggleContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}

export const useThemeToggle = () => useContext(ThemeToggleContext);
