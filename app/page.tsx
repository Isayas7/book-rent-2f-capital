import { Box, Divider, Typography } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import RegisterForm from "@/components/register-form";

export default function Home() {
  return (
    <Box>
      <Box sx={{ height: "100vh", color: "white" }}>
        {/* Left */}
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              backgroundColor: "#171B36",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              height: "100vh",
            }}
          >
            <LocalLibraryIcon sx={{ width: 200, height: 200 }} />
          </Box>
          {/* Right */}
          <Box
            sx={{
              color: "black",
              display: "flex",
              p: 4,
              flex: 1,
              height: "100vh",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,

                  alignItems: "center",
                  textAlign: "left",
                }}
              >
                <LocalLibraryIcon
                  sx={{ width: 50, height: 50, color: "#2929ad" }}
                />
                <Typography sx={{ fontSize: 25 }}>Book Rent</Typography>
              </Box>
              <Typography sx={{ mt: 2, fontSize: 20, textAlign: "left" }}>
                Signup into Book Rent
              </Typography>
              <Divider variant="fullWidth" sx={{ width: "100%" }} />
              <RegisterForm />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
