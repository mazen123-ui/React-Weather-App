import { IconButton, Box, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeToggle } from "../Context/ThemeContext";
import { useTranslations } from "../Context/TranslationContext";

export default function ThemeToggle() {
  const { mode, toggleTheme } = useThemeToggle();
  const { i18n } = useTranslations();

  // Position it opposite to the language toggle
  const isArabic = i18n.language === "ar";

  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        left: isArabic ? "auto" : 20,
        right: isArabic ? 20 : "auto",
        zIndex: 1000,
      }}
    >
      <Tooltip title={mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            backgroundColor: mode === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            color: mode === "light" ? "#1a2027" : "#fff",
            border: mode === "light" ? "1px solid rgba(0, 0, 0, 0.1)" : "1px solid rgba(255, 255, 255, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: mode === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.1)",
            },
          }}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
