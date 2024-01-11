import { Button, IconButton, useMediaQuery } from "@mui/material";
import React from "react";

const ResponsiveButton = ({ children,icon, ...props }) => {
  const mobileSize = useMediaQuery("(max-width:600px)");

  if (mobileSize) return <IconButton {...props}>{icon}</IconButton>;
  return <Button {...props}>{children}</Button>;
};

export default ResponsiveButton;
