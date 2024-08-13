"use client";
import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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
      accessorKey: "id",
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
          {"0123"}
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
      Cell: ({ cell }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {cell.getValue() === "BORROWED" ?

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
              :
              <Box
                sx={{
                  p: 0.3,
                  borderRadius: "50%",
                  border: "1px solid blue",
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    backgroundColor: "blue",
                    borderRadius: "50%",
                  }}
                />
              </Box>
            }

            <Box>{cell.getValue() === "BORROWED" ? "Reneted" : "Free"}</Box>
          </Box>
        )
      }
    },
    {
      accessorKey: "rentPrice",
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
            <EditOutlinedIcon sx={{ cursor: "pointer" }} />
            <DeleteIcon sx={{ color: "red" }} />
          </Box>
        </Box>
      ),
    },
  ];
