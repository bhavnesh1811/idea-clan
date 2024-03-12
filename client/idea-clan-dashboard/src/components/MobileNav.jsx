import {
  Avatar,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { FiMenu } from "react-icons/fi";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/auth/auth.action";

const MobileNav = ({ onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isMobile = useBreakpointValue({ base: true, sm: false });
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
        mr="8px"
      />

      <HStack
        spacing={{ base: "2", md: "6" }}
        marginInline={isMobile ? "" : "16px"}
      >
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {!isMobile && (
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"sm"} name={sessionStorage.getItem("name")} />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </HStack>
    </Flex>
  );
};

export default MobileNav;
