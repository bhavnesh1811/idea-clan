import React from "react";
import { Box } from "@chakra-ui/react";
const DashBoard = () => {
  const role = sessionStorage.getItem("role") || "";

  if(role==="student"){
    
  }
  return <Box> DashBoard</Box>;
};

export default DashBoard;
