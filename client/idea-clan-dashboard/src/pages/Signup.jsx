import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../redux/auth/auth.action";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import {
  Box,
  Flex,
  Input,
  Stack,
  Button,
  Heading,
  FormLabel,
  FormControl,
  useColorModeValue,
  useToast,
  InputRightAddon,
  InputGroup,
  Text,
} from "@chakra-ui/react";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const token = sessionStorage.getItem("token") || "";

  useEffect(() => {
    if (token) {
      location.state ? navigate(location.state) : navigate("/");
    }
    // eslint-disable-next-line
  }, [token]);

  const handleInputChange = (e, setterState) => {
    setterState(e.target.value);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    const credentials = {
      name,
      email,
      password,
    };
    dispatch(registerUser(credentials)).then(({ status, msg }) => {
      if (status) {
        toast({
          title: "Signup Successful.",
          description: msg,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error.",
          description: msg,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      setLoading(false);

      if (status === 1) {
        location.state ? navigate(location.state) : navigate("/");
      }
    });
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Flex
      w={"100%"}
      align="center"
      bg={useColorModeValue("gray.50", "gray.800")}
      justify="center"
      minH="100vh"
    >
      <Stack maxW="lg" mx="auto" px={6} py={12} spacing={8}>
        <Box
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
          rounded="lg"
        >
          <Stack as="form" onSubmit={handleSignIn} spacing={4}>
            <Heading as="h3" textAlign="center">
              Sign Up
            </Heading>

            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                isRequired
                onChange={(e) => handleInputChange(e, setName)}
                type="text"
                value={name}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                isRequired
                onChange={(e) => handleInputChange(e, setEmail)}
                type="email"
                value={email}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  isRequired
                  onChange={(e) => handleInputChange(e, setPassword)}
                  type={visible ? "text" : "password"}
                  value={password}
                />
                <InputRightAddon onClick={toggleVisible}>
                  {visible ? <BiSolidShow /> : <BiSolidHide />}
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <Stack>
              <Button
                _hover={{
                  bg: "blue.500",
                }}
                bg="blue.400"
                color="white"
                isLoading={loading}
                type="submit"
              >
                Sign up
              </Button>
            </Stack>
            <Flex gap="8px" justifyContent={"center"}>
              <Text>Already a User?</Text>
              <Text
                cursor={"pointer"}
                color="blue"
                as="span"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Signup;
