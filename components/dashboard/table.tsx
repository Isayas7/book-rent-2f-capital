"use client";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Typography } from "@mui/material";

type Person = {
  no: string;
  bookNamber: string;
  owner: string;
  status: string;
  price: string;
};

const data: Person[] = [
  {
    no: "01",
    bookNamber: "John",
    owner: "Doe",
    status: "East Daphne",
    price: "Kentucky",
  },
  {
    no: "01",
    bookNamber: "Jane",
    owner: "Doe",
    status: "Columbus",
    price: "Ohio",
  },
  {
    no: "01",
    bookNamber: "Joe",
    owner: "Doe",
    status: "South Linda",
    price: "West Virginia",
  },
  {
    no: "01",
    bookNamber: "Kevin",
    owner: "Vandy",
    status: "Lincoln",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Omaha",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Omaha",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Omaha",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Omaha",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Omaha",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Omaha",
    price: "Nebraska",
  },
  {
    no: "01",
    bookNamber: "Joshua",
    owner: "Rolluffs",
    status: "Omaha",
    price: "Nebraska",
  },
];

const CustomTable = () => {
  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "no",
        header: "No.",
        size: 40,
      },
      {
        accessorKey: "bookNamber",
        header: "Book no.",
        size: 40,
      },
      {
        accessorKey: "owner",
        header: "Owner",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 200,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableSorting: false,

    enablePagination: false,
    enableTableFooter: false,
    enableStickyFooter: false,
    enableBottomToolbar: false,

    muiTableContainerProps: {
      sx: {
        maxHeight: "300px",
        p: 2,
      },
    },
    muiTableHeadCellProps: {
      sx: {
        fontWeight: "normal",
      },
    },
    renderTopToolbarCustomActions: () => (
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, ml: 3, mt: 3, mb: -3, fontSize: 16 }}
      >
        Live Book status
      </Typography>
    ),

    columns,
    data,
  });

  return <MaterialReactTable table={table} />;
};

export default CustomTable;
