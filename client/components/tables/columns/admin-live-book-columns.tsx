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
  coverPhotoUrl: string
};

export const adminLiveBookColumns: MRT_ColumnDef<adminLiveBookColumnsTypes>[] =
  [
    {
      accessorKey: "id",
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
          {"0123"}
        </Box>
      ),
    },
    {
      accessorKey: "owner",
      header: "Owner",
      size: 150,
      Cell: ({ cell }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Image
              src={cell.row.original.coverPhotoUrl || "/woman.png"}
              alt="woman"
              width={24}
              height={24}
              style={{ borderRadius: "50%", border: "1px solid grey" }}
            />
            <Box>{cell.getValue()}</Box>
          </Box>
        )
      }


    },
    {
      accessorKey: "rentalStatus",
      header: "Status",
      size: 150,
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
      size: 200,
    },
  ];
