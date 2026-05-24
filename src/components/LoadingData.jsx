import { Box } from "@mui/material";
import { useTranslations } from "../Context/TranslationContext";

export default function LoadingData() {
  const { t } = useTranslations();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        color: "text.primary",
        fontSize: "2rem",
      }}
    >
      <p>{t("loading")}</p>
    </Box>
  );
}
