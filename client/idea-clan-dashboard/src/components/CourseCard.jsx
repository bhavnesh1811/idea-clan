import { Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import EditCourse from "../modals/EditCourse";
import { useDispatch } from "react-redux";
import { deleteCourseDetails } from "../redux/courses/course.action";

const CourseCard = (course) => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role") || "";
  const dispatch = useDispatch();
  const toast = useToast();
  const deleteCourse = (courseId) => {
    dispatch(deleteCourseDetails(courseId)).then(({ message }) => {
      if (message === "success") {
        toast({
          title: "Course Details Deleted",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
      }
      if (message === "error") {
        toast({
          title: "Course Details Not Deleted",
          status: "error",
          duration: 3000,
          position: "top-right",
        });
      }
    });
  };
  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      gap="12px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
      p={3}
    >
      {role === "admin" && (
        <Flex justifyContent={"end"} gap="8px">
          <EditCourse {...course} />

          <MdDelete onClick={() => deleteCourse(course._id)} />
        </Flex>
      )}
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
        display={role === "admin" ? "none" : "block"}
      >
        Apply
      </Button>
    </Flex>
  );
};

export default CourseCard;
