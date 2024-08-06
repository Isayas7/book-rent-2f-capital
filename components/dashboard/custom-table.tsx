"use client";
import {
  MaterialReactTable,
  MRT_RowData,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Typography } from "@mui/material";

type CustomTableProps<T extends MRT_RowData> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  maxHeight: string;
  title: string;
};

function CustomTable<T extends MRT_RowData>({
  columns,
  data,
  maxHeight,
  title,
}: CustomTableProps<T>) {
  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableSorting: false,

    enablePagination: false,
    enableTableFooter: false,
    enableStickyFooter: false,
    enableBottomToolbar: false,

    muiTableContainerProps: {
      sx: {
        maxHeight: maxHeight,
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
        {title}
      </Typography>
    ),

    columns,
    data,
  });

  return <MaterialReactTable table={table} />;
}

export default CustomTable;
