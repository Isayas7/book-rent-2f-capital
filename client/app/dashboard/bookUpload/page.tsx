"use client"
import UploadBook from "@/components/dashboard/upload-book";
import { AuthContext } from "@/context/AuthContext";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";

export default function BookUpload() {
  const { user } = useContext(AuthContext);

  return (
    <Box
      sx={{
        backgroundColor: "var(--bgCard)",
        height: "calc(100vh - 85px)",
        p: 2,
        borderRadius: 2,
        display: "flex",
        // justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
      }}
    >
      <Typography>BookUpload</Typography>
      <UploadBook />
    </Box>
  );
}
