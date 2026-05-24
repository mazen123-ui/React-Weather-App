import { Container, Box, Typography } from "@mui/material";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails";
import LoadingData from "./components/LoadingData";

import WeatherProvider from "./Context/WeatherContext";
import TranslationProvider from "./Context/TranslationContext";
import AppThemeProvider from "./Context/ThemeContext";
import LanguageToggle from "./components/LanguageToggle";
import ThemeToggle from "./components/ThemeToggle";
import ForecastList from "./components/ForecastList";
import Map from "./components/Map";

import { useWeather } from "./Context/WeatherContext";
import "./App.css";

function WeatherContent() {
  const { loading, error } = useWeather();

  if (loading) return <LoadingData />;
  if (error)
    return (
      <Box sx={{ color: "red", textAlign: "center", mt: 4 }}>
        <Typography variant="h6">Error: {error}</Typography>
      </Box>
    );

  return (
    <>
      <ThemeToggle />
      <LanguageToggle />
      <SearchBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs:'column',
            md:'row',
          },
          justifyContent: "center",
          alignItems: "center",
          gap: {
            xs:0,
            md:20,
          },
          mt: 4,
          mb: 4,
        }}
      >
        <CurrentWeather />
        <Map />
      </Box>
      <WeatherDetails />
      <ForecastList />
    </>
  );
}

export default function App() {
  return (
    <AppThemeProvider>
      <Box
        id="app-root"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: (theme) => theme.palette.mode === 'dark' 
            ? "linear-gradient(160deg, #0f0c29, #302b63, #24243e)" 
            : "linear-gradient(160deg, #e0c3fc 0%, #8ec5fc 100%)",
          color: "text.primary",
          transition: "background 0.5s ease",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <TranslationProvider>
            <WeatherProvider>
              <WeatherContent />
            </WeatherProvider>
          </TranslationProvider>
        </Container>
      </Box>
    </AppThemeProvider>
  );
}
