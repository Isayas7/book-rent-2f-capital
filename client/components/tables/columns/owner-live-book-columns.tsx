"use client";
import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import Link from "next/link";
import { useDeleteBookQuery } from "@/hooks/use-books-query";
import { toast } from "react-toastify";
import MenuItem from '@mui/material/MenuItem';

export type ownerLiveBookColumnsTypes = {
  rentals: any;
  id: string;
  bookNamber: string;
  bookName: string;
  rentalStatus: string;
  price: string;
  coverPhotoUrl: string
};

export const ownerLiveBookColumns: MRT_ColumnDef<ownerLiveBookColumnsTypes>[] =
  [
    {
      accessorKey: "id",
      header: "No.",
      size: 20,
      enableColumnFilterModes: false,
    },
    {

      accessorKey: "bookNumber",
      header: "Book no.",
      size: 30,
      filterFn: "equals",
      columnFilterModeOptions: ['equals', 'notEquals', "lessThan", "greaterThan"],
      Cell: ({ renderedCellValue }) => (
        <Box
          sx={{
            backgroundColor: "var(--softbg)",
            p: 0.3,
            borderRadius: "10%",
            textAlign: "center",
          }}
        >
          {renderedCellValue || "0123"}
        </Box>
      ),

    },
    {
      accessorKey: "bookName",
      header: "Book Name",
      filterFn: "contains",
      columnFilterModeOptions: ['equals', 'notEquals', 'contains', 'startsWith', 'endsWith'],
      size: 80,
      Cell: ({ row }) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Image
              src={row.original.coverPhotoUrl || "/woman.png"}
              alt="woman"
              width={24}
              height={24}
              style={{ borderRadius: "50%", border: "1px solid grey" }}
            />
            <Box>{row.original.bookName}</Box>
          </Box>
        )

      },
    },
    {
      accessorKey: "rentals.status",
      header: "Status",
      size: 40,
      filterFn: "equals",
      columnFilterModeOptions: ['equals', 'notEquals',],
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
      size: 40,
      filterFn: "equals",
      columnFilterModeOptions: ['equals', 'notEquals', "lessThan", "greaterThan", "lessThanOrEqual", "greaterThanOrEqual"],
    },
    {
      accessorKey: "action",
      header: "Action ",
      size: 100,
      enableColumnFilter: false,
      Cell: ({ row }) => {
        const { mutate: deleteBook } = useDeleteBookQuery();
        const handleDelete = () => {
          deleteBook(row.original.id, {
            onSuccess: () => {
              toast.success("Successfully deleted")
            },
          });
        }
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <div suppressHydrationWarning>
                {typeof window !== 'undefined' && <Link href={`/dashboard/bookUpload/update/${row.original.id}`}>

                  <EditOutlinedIcon sx={{ cursor: "pointer" }} />
                </Link>
                }
              </div>

              <DeleteIcon sx={{ color: "red", cursor: "pointer" }} onClick={handleDelete} />
            </Box>
          </Box>
        )
      }

    },
  ];
