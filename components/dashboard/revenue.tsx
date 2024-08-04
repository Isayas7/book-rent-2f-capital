import { Box, Divider, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
const Revenue = () => {
  const down = true;
  return (
    <Box sx={{ backgroundColor: "var(--bg)", borderRadius: 1, p: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography>Income</Typography>
        <Typography>This Month</Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
          ETB 9460.00
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Box>{down ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}</Box>
          <Typography>1.57</Typography>
        </Box>
      </Box>
      <Box>
        <Typography sx={{ fontSize: 12, opacity: 0.8 }}>
          Compered to ETB 9940 last month
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
            Last Month Income
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
            ETB 9460.00
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Revenue;
