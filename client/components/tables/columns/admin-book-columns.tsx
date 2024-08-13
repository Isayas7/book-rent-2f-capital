"use client";
import { useState } from "react"; // Import useState
import { Box, Switch } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import Image from "next/image";
import DoneIcon from "@mui/icons-material/Done";
import { useChangeBookStatusQuery } from "@/hooks/use-books-query";

export type adminBookColumnsTypes = {
  id: string;
  author: string;
  owner: string;
  category: string;
  bookName: string;
  status: string;
  coverPhotoUrl: String
};

const label = { inputProps: { "aria-label": "Switch demo" } };

export const adminBookColumns: MRT_ColumnDef<adminBookColumnsTypes>[] = [
  {
    accessorKey: "id",
    header: "No.",
    size: 40,
  },
  {
    accessorKey: "author",
    header: "Author",
    size: 40,
  },
  {
    accessorKey: "owner",
    header: "Owner",
    size: 150,
    Cell: ({ cell }) => (
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
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 200,
  },
  {
    accessorKey: "bookName",
    header: "Book Name ",
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 150,

    Cell: ({ cell }) => {
      const [checked, setChecked] = useState(cell.getValue() === "APPROVED");
      const mutation = useChangeBookStatusQuery();

      const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);
        const newStatus = cell.getValue() === "APPROVED" ? "APPROVE" : "APPROVED"
        mutation.mutate({ bookId: cell.row.original.id, newStatus });

      };

      return (
        <Box
          sx={{
            backgroundColor: "#E6F3E6",
            py: 0.1,
            px: 1,
            gap: 0.5,
            borderRadius: "10%",
            display: "flex",
            alignItems: "center",
            color: "#14a514",
          }}
        >
          <DoneIcon sx={{ fontSize: 18 }} />
          {cell.getValue()}
          <Switch
            {...label}
            size="medium"
            color="success"
            checked={checked}
            onChange={handleSwitchChange}
          />
        </Box>
      );
    },
  },
];
