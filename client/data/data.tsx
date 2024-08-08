import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmailIcon from "@mui/icons-material/Email";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import BookIcon from "@mui/icons-material/Book";
import PersonIcon from "@mui/icons-material/Person";

type AdminLink = {
  title: string;
  path: string;
  icon: React.ReactElement;
};

export const adminLinks1: AdminLink[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Books",
    path: "/dashboard/books",
    icon: <BookIcon />,
  },
  {
    title: "Owners",
    path: "/dashboard/owners",
    icon: <PersonIcon />,
  },
  {
    title: "Other",
    path: "/dashboard/other",
    icon: <EmailIcon />,
  },
];

export const ownerLinks: AdminLink[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Book Upload",
    path: "/dashboard/bookUpload",
    icon: <BookIcon />,
  },
  {
    title: "Other",
    path: "/dashboard/Other",
    icon: <PersonIcon />,
  },
  {
    title: "Other",
    path: "/dashboard/Other",
    icon: <PersonIcon />,
  },
  {
    title: "Other",
    path: "/dashboard/other",
    icon: <EmailIcon />,
  },
];

export const adminLinks2: AdminLink[] = [
  {
    title: "Notification",
    path: "/dashboard/notification",
    icon: <NotificationsIcon />,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <SettingsIcon />,
  },
  {
    title: "Login as Book Owner",
    path: "/login",
    icon: <EmailIcon />,
  },
];
