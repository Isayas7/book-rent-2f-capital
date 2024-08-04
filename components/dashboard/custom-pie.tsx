"use client";
import { Box, Typography } from "@mui/material";
import React, { PureComponent } from "react";

import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
];
const COLORS = ["#0088FE", "#FFBB28", "#FF8042"];

export default class CustomPie extends PureComponent {
  render() {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "space-between",
            pt: 2,
            px: 2,
          }}
        >
          <Typography>Available Books</Typography>
          <Typography
            sx={{
              backgroundColor: "var(--bgCard)",
              p: 0.5,
              borderRadius: "10%",
            }}
          >
            Today
          </Typography>
        </Box>
        <PieChart width={250} height={200}>
          <Pie
            data={data}
            // cx={120}
            // cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <Box
          sx={{
            display: "flex",
            // direction: "column",
            justifyContent: "space-between",
            gap: 2,
            px: 2,
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 10, //
                height: 10,
                backgroundColor: "#0088FE",
                borderRadius: "50%",
              }}
            />
            <Typography>Fiction</Typography>
          </Box>
          <Typography>12</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            // direction: "column",
            justifyContent: "space-between",
            gap: 2,
            px: 2,
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 10, //
                height: 10,
                backgroundColor: "#FFBB28",
                borderRadius: "50%",
              }}
            />
            <Typography>Self Help</Typography>
          </Box>
          <Typography>12</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            // direction: "column",
            justifyContent: "space-between",
            gap: 2,
            px: 2,
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 10, //
                height: 10,
                backgroundColor: "#FF8042",
                borderRadius: "50%",
              }}
            />
            <Typography>Business</Typography>
          </Box>
          <Typography>12</Typography>
        </Box>
      </Box>
    );
  }
}
