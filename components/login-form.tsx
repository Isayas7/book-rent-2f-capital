import { loginFormData, registerFormData } from "@/form/form";
import { Box, Button, Checkbox, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const LoginForm = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      {loginFormData.map((item, index) => (
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
        <Typography>Remember me</Typography>
      </Box>
      <Link href="/dashboard">
        <Button variant="contained" sx={{ width: "100%" }}>
          LOGIN
        </Button>
      </Link>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Have not have an account?</Typography>
        <Link href="/" style={{ color: "#0f4ec2" }}>
          Sign up
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
