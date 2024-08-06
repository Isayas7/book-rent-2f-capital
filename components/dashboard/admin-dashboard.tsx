import CustomChart from "@/components/dashboard/custom-chart";
import CustomPie from "@/components/dashboard/custom-pie";
import Revenue from "@/components/dashboard/revenue";
import { Box, Typography } from "@mui/material";
import React from "react";
import {
  adminLiveBookColumns,
  adminLiveBookColumnsTypes,
} from "@/components/dashboard/columns/admin-live-book-columns";
import CustomTable from "@/components/dashboard/custom-table";

export const data: adminLiveBookColumnsTypes[] = [
  {
    no: "01",
    bookNamber: "John",
    owner: "Doe",
    status: "Rent",
    price: "Kentucky",
  },
  {
    no: "01",
    bookNamber: "Jane",
    owner: "Doe",
    status: "Rent",
    price: "Ohio",
  },
  {
    no: "01",
    bookNamber: "Joe",
    owner: "Doe",
    status: "Rant",
    price: "West Virginia",
  },
  {
    no: "01",
    bookNamber: "Kevin",
    owner: "Vandy",
    status: "Rent",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Rented",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Rented",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Rented",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Rented",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Rented",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Rented",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Rented",
    price: "Nebraska",
  },
];

const AdminDashboard = () => {
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
            backgroundColor: "#FDFDFD",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <CustomPie />
        </Box>
      </Box>

      {/* Right */}
      <Box sx={{ flex: 3 }}>
        <CustomTable
          columns={adminLiveBookColumns}
          data={data}
          maxHeight="300px"
          title="Live Book status"
        />
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
};

export default AdminDashboard;
