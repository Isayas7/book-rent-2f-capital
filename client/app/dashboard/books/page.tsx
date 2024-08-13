"use client"
import {
  adminBookColumns,
  adminBookColumnsTypes,
} from "@/components/tables/columns/admin-book-columns";
import GenericTable from "@/components/tables/custom-table";
import { useBookQuery } from "@/hooks/use-books-query";
import { Box } from "@mui/material";
import React from "react";


export default function Owners() {
  const { data, isLoading } = useBookQuery();


  return (
    <Box sx={{
      width: "100%",
      overflowX: "scroll",
    }}>
      {isLoading ? <Box>Loading</Box> :
        <GenericTable
          columns={adminBookColumns}
          data={data}
          maxHeight="470px"
          title="List of Books"
          fetchUrl="api/book/allBooks"
        />

      }

    </Box>
  );
}
