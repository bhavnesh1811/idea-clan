import {
  Button,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = (course) => {
  const navigate = useNavigate();
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      gap="12px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
    >
      <VStack p={3}>
        <Heading as="h2" size="md">
          {course?.title}
        </Heading>
        <Text
          overflow={"hidden"}
          fontSize="md"
          color="gray.500"
          h={{ base: "150px", sm: "180px", lg: "120px" }}
        >
          {course?.description}
        </Text>
        <Text fontSize="md" color="blue.500">
          Duration: {course?.duration}
        </Text>
        <Button
          w="full"
          variant={"filled"}
          colorScheme="blue"
          onClick={() => navigate("/")}
        >
          Apply
        </Button>
      </VStack>
    </Flex>
  );
};

export default CourseCard;
