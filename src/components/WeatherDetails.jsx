import { Box, Typography, Grid } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CompressIcon from "@mui/icons-material/Compress";

import { useWeather } from "../Context/WeatherContext";
import { useTranslations } from "../Context/TranslationContext";

function DetailCard({ id, icon, label, value }) {
  return (
    <Box
      id={id}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2, // Increased padding
        mt: 2,
        borderRadius: "20px", // Rounder
        bgcolor: "background.paper",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: "action.hover",
          transform: "translateY(-5px)",
        },
      }}
    >
      <Box sx={{ color: "#90caf9", display: "flex" }}>{icon}</Box>
      <Box>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.primary", fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

export default function WeatherDetails() {
  const { currentWeatherData, loading } = useWeather();
  const { t, i18n } = useTranslations();

  if (loading || !currentWeatherData) return null;

  const locale = i18n.language === "ar" ? "ar-u-nu-arab" : i18n.language;
  const numberFormat = new Intl.NumberFormat(locale);

  const detailItems = [
    {
      id: "detail-wind",
      icon: <AirIcon />,
      label: t("wind"),
      value: `${numberFormat.format(currentWeatherData.wind_speed_10m)} km/h`,
    },
    {
      id: "detail-humidity",
      icon: <WaterDropIcon />,
      label: t("humidity"),
      value: `${numberFormat.format(currentWeatherData.relative_humidity_2m)}%`,
    },
    {
      id: "detail-temperature",
      icon: <CompressIcon />,
      label: t("apparent_temp"),
      value: `${numberFormat.format(Math.round(currentWeatherData.temperature_2m))}°C`,
    },
  ];

  return (
    <Box id="weather-details">
      <Typography variant="h6" sx={{ color: "text.primary", fontWeight: 600 }}>
        {t("weather_details")}
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {detailItems.map((item) => (
          <Grid size={{ xs: 6, sm: 4 }} key={item.id}>
            <DetailCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
