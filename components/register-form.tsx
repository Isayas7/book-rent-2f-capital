import { registerFormData } from "@/form/form";
import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const RegisterForm = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {registerFormData.map((item, index) => (
        <TextField
          key={index}
          id="outlined-basic"
          label={item.label}
          type={item.type}
          variant="outlined"
        />
      ))}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Checkbox {...label} />
        <Typography>I accept the Terms and Conditions</Typography>
      </Box>
      <Button variant="contained">SIGN IN</Button>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Alredy have an account?</Typography>
        <Link href="/login" style={{ color: "#0f4ec2" }}>
          Login
        </Link>
      </Box>
    </Box>
  );
};

export default RegisterForm;
