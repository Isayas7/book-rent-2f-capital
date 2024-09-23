import { useState } from 'react';
import {
  MaterialReactTable,
  MRT_Column,
  MRT_ColumnFilterFnsState,
  MRT_EditActionButtons,
  MRT_RowData,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_FilterOption
} from 'material-react-table';
import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import axios from 'axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type GenericApiResponse<T> = {
  data: T[];
};

type GenericTableProps<T extends MRT_RowData> = {
  fetchUrl: string;
  columns: MRT_ColumnDef<T>[];
  queryKey: string;
  maxHeight: string;
  title: string;
};

const GenericTable = <T extends MRT_RowData>({
  fetchUrl,
  columns,
  queryKey,
  maxHeight,
  title
}: GenericTableProps<T>) => {
  // const [columnFilterFns, setColumnFilterFns] = useState<Record<string, MRT_FilterOption>>({});
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [columnFilterFns, setColumnFilterFns] =
    useState<MRT_ColumnFilterFnsState>(
      () => Object.fromEntries(
        columns.map(({ accessorKey, filterFn }) => [accessorKey, filterFn])
      ) as MRT_ColumnFilterFnsState
    );




  const { data, isError, isRefetching, isLoading, refetch } = useQuery<GenericApiResponse<T>>({
    queryKey: [
      queryKey,
      columnFilterFns,
      columnFilters,
      globalFilter
    ],
    queryFn: async () => {
      const fetchURL = new URL(fetchUrl, process.env.NEXT_PUBLIC_BASE_URL);
      console.log("columnFilterFns", columnFilterFns);

      // Convert the columnFilters to the expected query string format
      if (columnFilters.length > 0) {
        const filters = columnFilters.map((filter: any) => ({
          id: filter.id,
          opervalue: columnFilterFns[filter.id],
          val: filter.value
        }));
        const filterString = JSON.stringify(filters);
        console.log("filterString", filterString);
        fetchURL.searchParams.append('filter', filterString);
      }




      // Add global filter
      // if (globalFilter) {
      //   fetchURL.searchParams.append('search', globalFilter);
      // }

      const response = await axios.get<GenericApiResponse<T>>(fetchURL.href, { withCredentials: true });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });




  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableSorting: false,
    enablePagination: false,
    enableTableFooter: false,
    enableStickyFooter: false,
    enableBottomToolbar: false,
    enableColumnFilterModes: true,
    manualFiltering: true,

    columns,
    data: data?.data ?? [],

    state: {
      columnFilters,
      globalFilter,
      columnFilterFns,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      showSkeletons: isLoading
    },
    // renderTopToolbarCustomActions: ({ table }) => (
    //   <Button
    //     variant="contained"
    //     onClick={() => {
    //       table.setCreatingRow(true); //simplest way to open the create row modal with no default values
    //       //or you can pass in a row object to set default values with the `createRow` helper function
    //       // table.setCreatingRow(
    //       //   createRow(table, {
    //       //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
    //       //   }),
    //       // );
    //     }}
    //   >
    //     Create New Role
    //   </Button>
    // ),
    muiTableContainerProps: { sx: { maxHeight, p: 2 } },
    muiTableHeadCellProps: { sx: { fontWeight: 'normal' } },
    muiToolbarAlertBannerProps: isError ? { color: 'error', children: 'Error loading data' } : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFilterFnsChange: setColumnFilterFns,
    createDisplayMode: 'modal',
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New Role</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),

  });

  return <MaterialReactTable table={table} />;
};

export default GenericTable;
