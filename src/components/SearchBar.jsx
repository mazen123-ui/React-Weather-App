import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useWeather } from "../Context/WeatherContext";
import { useTranslations } from "../Context/TranslationContext";

const selectStyles = {
  borderRadius: "16px",
  bgcolor: "background.paper",
  color: "text.primary",
  "& .MuiSvgIcon-root": { color: "text.secondary" },
  "& fieldset": { borderColor: "divider" },
  "&:hover fieldset": { borderColor: "text.disabled" },
  "&.Mui-focused fieldset": { borderColor: "#90caf9" },
};

const menuStyles = {
  PaperProps: {
    sx: {
      bgcolor: "background.paper",
      borderRadius: "12px",
      mt: 1,
      "& .MuiMenuItem-root": {
        color: "text.primary",
        "&:hover": { bgcolor: "background.paper" },
        "&.Mui-selected": {
          backgroundColor: "rgba(144,202,249,0.15)",
          "&:hover": { backgroundColor: "rgba(144,202,249,0.25)" },
        },
      },
    },
  },
};

export default function SearchBar() {
  const { t } = useTranslations();
  const cities = [
    { value: "Cairo", label: t("cairo") },
    { value: "Alexandria", label: t("alexandria") },
    { value: "Giza", label: t("giza") },
  ];

  let { setCity, city } = useWeather();
  return (
    <Box id="search-bar" sx={{ width: "100%", maxWidth: 500, mx: "auto" }}>
      <FormControl fullWidth>
        <InputLabel
          id="city-select-label"
          sx={{
            color: "text.secondary",
            "&.Mui-focused": { color: "#90caf9" },
          }}
        >
          {t("search_placeholder")}
        </InputLabel>
        <Select
          id="city-select"
          labelId="city-select-label"
          label="Select a city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          sx={selectStyles}
          MenuProps={menuStyles}
        >
          {cities.map((city) => (
            <MenuItem key={city.value} value={city.value}>
              {city.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
