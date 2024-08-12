import {
  adminOwnerColumns,
  adminOwnerColumnsTypes,
} from "@/components/dashboard/columns/admin-owner-columns";
import CustomTable from "@/components/dashboard/custom-table";
import { getQueryClient } from "@/get-query-client";
import { pokemonOptions } from "@/hooks/use-books-query";
import { Box } from "@mui/material";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

export const data: adminOwnerColumnsTypes[] = [
  {
    no: "01",
    owner: "Doe",
    upload: "John",
    location: "Kentucky",
    status: "Rent",
  },
  {
    no: "01",
    owner: "Doe",
    upload: "Jane",
    location: "Ohio",
    status: "Rent",
  },
  {
    no: "01",
    owner: "Doe",
    upload: "Joe",
    location: "West Virginia",
    status: "Rant",
  },
  {
    no: "01",
    owner: "Vandy",
    upload: "Kevin",
    location: "Nebraska",
    status: "Rent",
  },
  {
    no: "01",
    owner: "Rolluffs",
    upload: "Joshua",
    location: "Nebraska",
    status: "Rented",
  },
  {
    no: "01",
    owner: "Rolluffs",
    upload: "Joshua",
    location: "Nebraska",
    status: "Rented",
  },
  {
    no: "01",
    owner: "Rolluffs",
    upload: "Joshua",
    location: "Nebraska",
    status: "Rented",
  },
  {
    no: "01",
    owner: "Rolluffs",
    upload: "Joshua",
    location: "Nebraska",
    status: "Rented",
  },
  {
    no: "01",
    owner: "Rolluffs",
    upload: "Joshua",
    location: "Nebraska",
    status: "Rented",
  },
  {
    no: "01",
    owner: "Rolluffs",
    upload: "Joshua",
    location: "Nebraska",
    status: "Rented",
  },
  {
    no: "01",
    owner: "Rolluffs",
    upload: "Joshua",
    location: "Nebraska",
    status: "Rented",
  },
];
export default function Owners() {
   const queryClient = getQueryClient()
  void queryClient.prefetchQuery(pokemonOptions)

  return (
    <Box>
     <HydrationBoundary state={dehydrate(queryClient)}>
       <CustomTable
        columns={adminOwnerColumns}
        data={data}
        maxHeight="470px"
        title="List of Owner"
      />
      </HydrationBoundary>
      
    </Box>
  );
}
