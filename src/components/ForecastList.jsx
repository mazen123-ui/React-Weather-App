import { Box, Typography } from "@mui/material";
import ForecastCard from "./ForecastCard";
import { useWeather } from "../Context/WeatherContext";
import { useTranslations } from "../Context/TranslationContext";

const placeholderDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const weatherIcons = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  61: "🌧️",
  71: "❄️",
  95: "⛈️",
};

export default function ForecastList() {
  const { forecastData } = useWeather();
  const { t } = useTranslations();

  if (!forecastData) return null;

  const dates = forecastData.time;
  const maxTemps = forecastData.temperature_2m_max;
  const minTemps = forecastData.temperature_2m_min;
  const weather_code = forecastData.weather_code;

  return (
    <Box id="forecast-list" sx={{ mt: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ color: "text.secondary", mb: 2, pl: 1 }}
      >
        {t('forecast_title')}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          pb: 1,
        }}
      >
        {placeholderDays.map((day, index) => (
          <ForecastCard
            key={day}
            day={dates[index]}
            high={maxTemps[index]}
            low={minTemps[index]}
            index={index}
            icon={weatherIcons[weather_code[index]]}
          />
        ))}
      </Box>
    </Box>
  );
}
