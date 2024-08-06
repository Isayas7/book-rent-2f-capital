import UploadBook from "@/components/upload-book";
import { Box, Typography } from "@mui/material";

export default function BookUpload() {
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
