"use client";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import { adminLinks1, adminLinks2, ownerLinks } from "@/data/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const role = "owner";

  return (
    <Box sx={{ p: 1, height: "100%" }}>
      <Box
        sx={{
          backgroundColor: "#171B36",
          color: "white",
          borderRadius: 2,
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
            gap: 1,
            px: 2,
            pt: 1,
          }}
        >
          <MenuIcon />
          <LocalLibraryIcon sx={{ width: 35, height: 35, color: "#115293" }} />
          <Typography sx={{ fontSize: 20, color: "#115293" }}>
            Book Rent
          </Typography>
        </Box>

        <List sx={{ px: 1 }}>
          {role !== "owner"
            ? adminLinks1.map((link, index) => (
                <ListItem
                  disablePadding
                  key={index}
                  sx={(theme) => ({
                    ...(link.path === pathname && {
                      backgroundColor: "#115293",
                    }),
                    borderRadius: 2,
                    marginTop: 1,
                    "&:hover": {
                      backgroundColor: "#115293",
                    },
                  })}
                >
                  <Link href={link.path} style={{ width: "100%" }}>
                    <ListItemButton sx={{ fontSize: 25 }}>
                      <ListItemIcon sx={{ color: "white" }}>
                        {link.icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{ fontSize: 25 }}
                        primary={link.title}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))
            : role === "owner"
            ? ownerLinks.map((link, index) => (
                <ListItem
                  disablePadding
                  key={index}
                  sx={(theme) => ({
                    ...(link.path === pathname && {
                      backgroundColor: "#115293",
                    }),
                    borderRadius: 2,
                    marginTop: 1,
                    "&:hover": {
                      backgroundColor: "#115293",
                    },
                  })}
                >
                  <Link href={link.path} style={{ width: "100%" }}>
                    <ListItemButton sx={{ fontSize: 25 }}>
                      <ListItemIcon sx={{ color: "white" }}>
                        {link.icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={{ fontSize: 25 }}
                        primary={link.title}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))
            : ""}
        </List>

        <Divider sx={{ color: "#115293" }} />

        <List sx={{ px: 1 }}>
          {adminLinks2.map((link, index) => (
            <ListItem
              disablePadding
              key={index}
              sx={(theme) => ({
                ...(link.path === pathname && {
                  backgroundColor: "#115293",
                }),
                borderRadius: 2,
                marginTop: 1,
                "&:hover": {
                  backgroundColor: "#115293",
                },
              })}
            >
              <Link href={link.path} style={{ width: "100%" }}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "white" }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText sx={{ fontWeight: 50 }} primary={link.title} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
