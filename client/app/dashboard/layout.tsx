import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import { Box } from "@mui/material";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 1, height: "100vh", position: "fixed", top: 0 }}>
        <Sidebar />
      </Box>
      <Box sx={{ flex: 4, p: 1, ml: 35 }}>
        <Navbar />
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
