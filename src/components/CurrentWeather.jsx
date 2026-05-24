import { Box, Typography } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useWeather } from "../Context/WeatherContext";
import { useTranslations } from "../Context/TranslationContext";

export default function CurrentWeather() {
  const { currentWeatherData, city, loading } = useWeather();
  const { t, i18n } = useTranslations();

  if (loading || !currentWeatherData) return null;

  // Determine locale with numbering system
  const locale = i18n.language === "ar" ? "ar-u-nu-arab" : i18n.language;

  // Format Date using native Intl API
  const formattedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  // Format Number (Temperature)
  const formattedTemp = new Intl.NumberFormat(locale).format(
    Math.round(currentWeatherData.temperature_2m)
  );

  // Get Translated Description
  const description = t(`weather_codes.${currentWeatherData.weather_code}`, {
    defaultValue: t("weather_codes.0"), // Fallback to clear sky
  });

  return (
    <Box
      id="current-weather"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        py: 4,
      }}
    >
      {/* Weather icon */}
      <Box
        id="weather-icon"
        sx={{
          width: 120,
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #fbc02d33, #ff980033)",
          mb: 1,
        }}
      >
        {currentWeatherData.weather_code === 0 ? (
          <WbSunnyIcon sx={{ fontSize: 64, color: "#fdd835" }} />
        ) : currentWeatherData.weather_code < 60 ? (
          <CloudIcon sx={{ fontSize: 64, color: "#90caf9" }} />
        ) : (
          <WaterDropIcon sx={{ fontSize: 64, color: "#64b5f6" }} />
        )}
      </Box>
 
      {/* Temperature */}
      <Typography
        id="temperature"
        variant="h1"
        sx={{ 
          fontWeight: 200, 
          color: "text.primary",  
          fontSize: { xs: "4rem", md: "5rem" },
          lineHeight: 1
        }}
      >
        {formattedTemp}°
      </Typography>
 
      {/* Description */}
      <Typography
        id="weather-description"
        variant="h6"
        sx={{ color: "text.secondary", fontWeight: 400, textTransform: "capitalize" }}
      >
        {description}
      </Typography>
 
      {/* City name & date */}  
      <Typography
        id="city-name"
        variant="h6" // Bigger
        sx={{ color: "text.primary", fontWeight: 600 }}
      >
        {t("city_egypt", { city: t(city.toLowerCase()) })}
      </Typography>

      <Typography
        id="current-date"
        variant="body1"
        sx={{ color: "text.secondary", fontWeight: 300 }}
      >
        {formattedDate}
      </Typography>
    </Box>
  );
}