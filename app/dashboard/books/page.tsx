import {
  adminBookColumns,
  adminBookColumnsTypes,
} from "@/components/dashboard/columns/admin-book-columns";
import CustomTable from "@/components/dashboard/custom-table";
import { Box } from "@mui/material";
import React from "react";

export const data: adminBookColumnsTypes[] = [
  {
    no: "01",
    author: "John",
    owner: "Doe",
    category: "Kentucky",
    bookName: "Kentucky",
    status: "Rent",
  },
  {
    no: "01",
    author: "Jane",
    owner: "Doe",
    category: "Ohio",
    bookName: "Kentucky",
    status: "Rent",
  },
  {
    no: "01",
    author: "Joe",
    owner: "Doe",
    category: "West Virginia",
    bookName: "Kentucky",
    status: "Rant",
  },
  {
    no: "01",
    author: "Kevin",
    owner: "Vandy",
    category: "Nebraska",
    bookName: "Kentucky",
    status: "Rent",
  },
  {
    no: "01",
    author: "Joshua",
    owner: "Rolluffs",
    category: "Nebraska",
    bookName: "Kentucky",
    status: "Rented",
  },
  {
    no: "01",
    author: "Joshua",
    owner: "Rolluffs",
    category: "Nebraska",
    bookName: "Kentucky",
    status: "Rented",
  },
  {
    no: "01",
    author: "Joshua",
    owner: "Rolluffs",
    category: "Nebraska",
    bookName: "Kentucky",
    status: "Rented",
  },
  {
    no: "01",
    author: "Joshua",
    owner: "Rolluffs",
    category: "Nebraska",
    bookName: "Kentucky",
    status: "Rented",
  },
  {
    no: "01",
    author: "Joshua",
    owner: "Rolluffs",
    category: "Nebraska",
    bookName: "Kentucky",
    status: "Rented",
  },
  {
    no: "01",
    author: "Joshua",
    owner: "Rolluffs",
    category: "Nebraska",
    bookName: "Kentucky",
    status: "Rented",
  },
  {
    no: "01",
    author: "Joshua",
    owner: "Rolluffs",
    category: "Nebraska",
    bookName: "Kentucky",
    status: "Rented",
  },
];

export default function Owners() {
  return (
    <Box>
      <CustomTable
        columns={adminBookColumns}
        data={data}
        maxHeight="470px"
        title="List of Books"
      />
    </Box>
  );
}
