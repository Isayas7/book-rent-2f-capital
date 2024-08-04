"use client";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <Box sx={{ backgroundColor: "var(--bgCard)", p: 2, borderRadius: 2 }}>
      {pathname.split("/").pop()}
    </Box>
  );
};

export default Navbar;
