
"use client";
import { Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useDeleteBookQuery } from "@/hooks/use-books-query";
import { toast } from "react-toastify";

export type roleAndPermissionsTypes = {
    id: string;
    roles: string;
    permissions: string;

};

export const roleAndPermissionsColumns: MRT_ColumnDef<roleAndPermissionsTypes>[] =
    [
        {
            accessorKey: "roles",
            header: "Roles",
            size: 20,
            filterFn: "equals",
            enableColumnFilterModes: false,
        },
        {
            accessorKey: "permissions",
            header: "Permissions",
            size: 20,
            enableColumnFilterModes: false,
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
