"use client";
import { Box, Button, Modal, Switch, TextField } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import Image from "next/image";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { useChangeOwnerStatusQuery } from "@/hooks/use-users-query";

export type adminOwnerColumnsTypes = {
  id: string;
  username: string;
  email: string;
  upload: string;
  location: string;
  phoneNumber: String,
  status: string;
  coverPhotoUrl: string
};
const label = { inputProps: { "aria-label": "Switch demo" } };

export const adminOwnerColumns: MRT_ColumnDef<adminOwnerColumnsTypes>[] = [
  {
    accessorKey: "id",
    header: "No.",
    size: 40,
  },

  {
    accessorKey: "username",
    header: "Owner",
    size: 150,
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
          <Box>{row.original.username}</Box>
        </Box>
      )
    }
  },
  {
    accessorKey: "upload",
    header: "Upload",
    size: 40,
  },
  {
    accessorKey: "location",
    header: "Location",
    size: 200,
  },

  {
    accessorKey: "status",
    header: "Status",
    size: 150,

    Cell: ({ row }) => {
      const [checked, setChecked] = useState(row.original.status === "APPROVED");
      const mutation = useChangeOwnerStatusQuery();

      const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);
        const newStatus = row.original.status === "APPROVED" ? "APPROVE" : "APPROVED"
        mutation.mutate({ ownerId: row.original.id, newStatus });

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
          {row.original.status}
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

  {
    accessorKey: "action",
    header: "Action ",
    size: 200,
    Cell: ({ cell }) => {
      const style = {
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 5
      };
      const [open, setOpen] = useState(false);
      const handleOpen = () => {
        setOpen(true);
      };


      const handleClose = () => {
        setOpen(false);
      };
      return (
        < Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <VisibilityIcon onClick={handleOpen} sx={{ cursor: "pointer" }} />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 500 }}>
                <TextField
                  value={cell.row.original.username}
                  id="outlined-basic"
                  label="Name"
                  type="text"
                  variant="outlined"
                />
                <TextField
                  value={cell.row.original.email}
                  id="outlined-basic"
                  label="Email"
                  type="mail"
                  variant="outlined"
                />
                <TextField
                  value={cell.row.original.location}

                  id="outlined-basic"
                  label="Location"
                  type="text"
                  variant="outlined"
                />
                <TextField
                  value={cell.row.original.phoneNumber}

                  id="outlined-basic"
                  label="Phone Number"
                  type="Phone"
                  variant="outlined"
                />


              </Box>
            </Modal>
            <DeleteIcon sx={{ color: "red" }} />
          </Box>
          {cell.row.original.status === "APPROVED" ?
            <Button variant="contained" size="small" sx={{
              width: "100px",
              height: "40px"
            }}>
              {cell.row.original.status}
            </Button> :
            <Button variant="contained" size="small" sx={{
              backgroundColor: "grey", width: "100px",
              height: "40px"
            }}>
              {cell.row.original.status}
            </Button>

          }

        </Box >
      )
    }

  },
];
