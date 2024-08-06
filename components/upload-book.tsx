"use client";

import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const UploadBook = () => {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <Box>
      <Box sx={{ width: 400 }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            variant="filled"
            autoComplete="true"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            <Button sx={{ width: "100%" }}>Add</Button>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default UploadBook;
