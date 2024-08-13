"use client"
import {
  adminOwnerColumns,
} from "@/components/tables/columns/admin-owner-columns";
import GenericTable from "@/components/tables/custom-table";
import { useOwnerQuery } from "@/hooks/use-users-query";
import { Box } from "@mui/material";
import React from "react";


export default function Owners() {
  const { data, isLoading } = useOwnerQuery();

  return (
    <Box>
      {isLoading ?
        <Box>Loading</Box>
        :
        <GenericTable
          columns={adminOwnerColumns}
          maxHeight="470px"
          title="List of Owner"
          fetchUrl="/api/user/ownerList"
          queryKey="ownerList"
        />
      }

    </Box>

  );
}
