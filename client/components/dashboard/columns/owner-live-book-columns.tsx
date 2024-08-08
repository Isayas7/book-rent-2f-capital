"use client";
import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

export type ownerLiveBookColumnsTypes = {
  no: string;
  bookNamber: string;
  bookName: string;
  status: string;
  price: string;
};

export const ownerLiveBookColumns: MRT_ColumnDef<ownerLiveBookColumnsTypes>[] =
  [
    {
      accessorKey: "no",
      header: "No.",
      size: 20,
    },
    {
      accessorKey: "bookNamber",
      header: "Book no.",
      size: 30,
      Cell: ({ renderedCellValue }) => (
        <Box
          sx={{
            backgroundColor: "var(--softbg)",
            p: 0.3,
            borderRadius: "10%",
            textAlign: "center",
          }}
        >
          {renderedCellValue}
        </Box>
      ),
    },
    {
      accessorKey: "bookName",
      header: "Book Name",
      size: 80,
      Cell: ({ renderedCellValue }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Image
            src="/woman.png"
            alt="woman"
            width={24}
            height={24}
            style={{ borderRadius: "50%", border: "1px solid grey" }}
          />
          <Box>{renderedCellValue}</Box>
        </Box>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 40,
      Cell: ({ renderedCellValue }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              p: 0.3,
              borderRadius: "50%",
              border: "1px solid red",
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                backgroundColor: "red",
                borderRadius: "50%",
              }}
            />
          </Box>
          <Box>{renderedCellValue}</Box>
        </Box>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      size: 40,
    },
    {
      accessorKey: "action",
      header: "Action ",
      size: 100,
      Cell: () => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VisibilityIcon />
            <DeleteIcon sx={{ color: "red" }} />
          </Box>
        </Box>
      ),
    },
  ];
