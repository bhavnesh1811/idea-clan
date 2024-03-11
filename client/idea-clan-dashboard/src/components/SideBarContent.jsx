import {
    // Avatar,
    Box,
    CloseButton,
    Flex,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React from "react";
  import { Link, useNavigate } from "react-router-dom";
  import NavItem from "./NavItem";
  import { GiWallet } from "react-icons/gi";
  import { RxDashboard } from "react-icons/rx";
  
  const LinkItems = [
    { name: "DashBoard", icon: RxDashboard },
    { name: "Courses", icon: GiWallet },
    { name: "Lectures", icon: GiWallet },
    { name: "Profile", icon: GiWallet },
  ];
  
  const SideBarContent = ({ onClose, ...rest }) => {
    const nav = useNavigate();
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue("white", "gray.900")}
        borderRight="1px"
        borderRightColor={useColorModeValue("gray.200", "gray.700")}
        w={{ base: "full", md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex
          h="20"
          alignItems="center"
          mx="8"
          justifyContent="space-between"
          onClick={() => nav("/")}
          cursor={"pointer"}
        >
          <Text>EduHub</Text>
          {/* <Avatar
            size="lg"
            src="https://play-lh.googleusercontent.com/00O55jNA2nyUFzkxIALUiqY9zlnbF8SLU3NzibAjyGkGg7vpyWS8ZrIsPDXhCkpBCa4=w240-h480-rw"
            alt="logo"
          /> */}
          <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
        </Flex>
  
        {LinkItems.map((link,index) => (
          <Link
          key={index}
            to={link.name === "DashBoard" ? "/" : `/${link.name.toLowerCase()}`}
            onClick={() => onClose()}
          >
            <NavItem key={link.name} icon={link.icon}>
              {link.name}
            </NavItem>
          </Link>
        ))}
      </Box>
    );
  };
  
  export default SideBarContent;
  