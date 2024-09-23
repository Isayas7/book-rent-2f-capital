"use client";
import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import Image from "next/image";

export type adminLiveBookColumnsTypes = {
  rentals: any;
  owner: any;
  no: string;
  bookNamber: string;
  email: string;
  username: string;
  rentalStatus: string;
  price: string;
  coverPhotoUrl: string
};

export const adminLiveBookColumns: MRT_ColumnDef<adminLiveBookColumnsTypes>[] =
  [
    {
      accessorKey: "id",
      header: "No.",
      enableColumnFilter: false,
      size: 40,
    },
    {
      accessorKey: "bookNumber",
      header: "Book no.",
      filterFn: "equals",
      columnFilterModeOptions: ['equals', 'notEquals', "lessThan", "greaterThan"],
      size: 40,
      Cell: ({ row }) => (
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
      accessorKey: "owner.username",
      header: "Owner",
      size: 150,
      filterFn: "contains",
      columnFilterModeOptions: ['equals', 'notEquals', 'contains', 'startsWith', 'endsWith'],
      Cell: ({ row }) => {
        const username = row.original?.owner.email?.split('@');
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Image
              src={row.original.coverPhotoUrl || "/woman.png"}
              alt="woman"
              width={24}
              height={24}
              style={{ borderRadius: "50%", border: "1px solid grey" }}
            />
            <Box>{row.original.owner.username || <>&ndash;</>}</Box>
          </Box>
        )
      }
    },
    {
      accessorKey: "rentals.status",
      header: "Status",
      filterFn: "equals",
      columnFilterModeOptions: ['equals', 'notEquals',],
      size: 150,
      Cell: ({ row }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {row.original.rentals.status === "BORROWED" ?

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

            <Box>{row.original.rentals.status === "BORROWED" ? "Rented" : "Free"}</Box>
          </Box>
        )
      }


    },
    {
      accessorKey: "rentPrice",
      header: "Price",
      filterFn: "equals",
      columnFilterModeOptions: ['equals', 'notEquals', "lessThan", "greaterThan"],
      size: 200,
    },
  ];
