import { Box, Typography } from "@mui/material";

export default function ForecastCard({
  day = "---",
  high = "--",
  low = "--",
  icon,
}) {
  return (
    <Box
      className="forecast-card"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        p: 2,
        minWidth: 90,
        borderRadius: "16px",
        bgcolor: "background.paper",
        backdropFilter: "blur(6px)",
        transition: "transform 0.2s, background-color 0.25s",
        "&:hover": {
          transform: "translateY(-4px)",
          bgcolor: "action.hover",
        },
      }}
    >
      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {day}
      </Typography>
      {icon}
      <Box sx={{ display: "flex", gap: 0.5, alignItems: "baseline" }}>
        <Typography variant="body1" sx={{ color: "text.primary", fontWeight: 600 }}>
          {high}°
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {low}°
        </Typography>
      </Box>
    </Box>
  );
}
