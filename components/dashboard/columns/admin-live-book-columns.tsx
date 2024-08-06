"use client";
import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import Image from "next/image";

export type adminLiveBookColumnsTypes = {
  no: string;
  bookNamber: string;
  owner: string;
  status: string;
  price: string;
};

export const adminLiveBookColumns: MRT_ColumnDef<adminLiveBookColumnsTypes>[] =
  [
    {
      accessorKey: "no",
      header: "No.",
      size: 40,
    },
    {
      accessorKey: "bookNamber",
      header: "Book no.",
      size: 40,
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
      accessorKey: "owner",
      header: "Owner",
      size: 150,
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
      size: 150,
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
      size: 200,
    },
  ];
