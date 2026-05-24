import { IconButton, Box, Tooltip } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslations } from "../Context/TranslationContext";

export default function LanguageToggle() {
  const { i18n } = useTranslations();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        right: i18n.language === "ar" ? "auto" : 20,
        left: i18n.language === "ar" ? 20 : "auto",
        zIndex: 1000,
      }}
    >
      <Tooltip
        title={
          i18n.language === "en" ? "Translate to Arabic" : "ترجم إلى الإنجليزية"
        }
      >
        <IconButton
          onClick={toggleLanguage}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            color: "text.primary",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.1)",
            },
          }}
        >
          <LanguageIcon />
          <Box
            sx={{
              ml: i18n.language === "ar" ? 0 : 0.5,
              mr: i18n.language === "ar" ? 0.5 : 0,
              fontSize: "0.75rem",
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {i18n.language === "en" ? "AR" : "EN"}
          </Box>
        </IconButton>
      </Tooltip>
    </Box>
  );
}
