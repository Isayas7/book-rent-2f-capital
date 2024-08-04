import CustomChart from "@/components/dashboard/custom-chart";
import CustomPie from "@/components/dashboard/custom-pie";
import Revenue from "@/components/dashboard/revenue";
import CustomTable from "@/components/dashboard/table";
import { Box, Typography } from "@mui/material";
import React from "react";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Left */}
      <Box
        sx={{
          backgroundColor: "var(--bgCard)",
          p: 2,
          flex: 1,
          borderRadius: 2,
        }}
      >
        <Typography sx={{ fontWeight: 600, opacity: 0.8 }}>
          This Month statistics
        </Typography>
        <Typography sx={{ fontSize: 14, opacity: 0.6 }}>
          Tue, 14 Nov, 2024, 11:30
        </Typography>
        <Revenue />
        <Box
          sx={{
            mt: 3,

            borderRadius: 2,
            backgroundColor: "var(--bg)",
          }}
        >
          <CustomPie />
        </Box>
      </Box>

      {/* Right */}
      <Box sx={{ flex: 3 }}>
        <CustomTable />
        <Box
          sx={{
            mt: 2,
            p: 3,
            borderRadius: 2,
            width: "100%",
            height: "350px",
            backgroundColor: "var(--bgCard)",
          }}
        >
          <CustomChart />
        </Box>
      </Box>
    </Box>
  );
}
