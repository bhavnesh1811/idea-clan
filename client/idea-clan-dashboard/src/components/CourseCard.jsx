import { Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import EditCourse from "../modals/EditCourse";
import { useDispatch } from "react-redux";
import { deleteCourseDetails } from "../redux/courses/course.action";
import axios from "axios";
import { config } from "../configs/config";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const CourseCard = ({ course, currentCourses, setCurrentCourses }) => {
  const role = sessionStorage.getItem("role") || "";
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/getusers`, config);

      setCurrentCourses(res?.data?.user[0]?.currentCourses);
    } catch (error) {
      console.log(error);
    }
  };

  const applyCourse = async (id) => {
    if (currentCourses?.length === 3) {
      return toast({
        title: "Course Applied Limit Exceeded",
        status: "success",
        duration: 3000,
        position: "top-right",
      });
    }
    const data = {
      courseId: id,
    };
    try {
      const res = await axios.patch(
        `${BASE_URL}/users/apply-course`,
        data,
        config
      );

      if (res.data.message === "Course applied successfully") {
        toast({
          title: "Course Applied",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
      }
      getUser();
    } catch (error) {
      console.log(error);
    }
  };
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
      h="-webkit-fit-content"
    >
      {role === "admin" && (
        <Flex justifyContent={"end"} gap="8px">
          <EditCourse {...course} />

          <MdDelete onClick={() => deleteCourse(course._id)} />
        </Flex>
      )}
      <Heading as="h2" size="md" justifyContent={"flex-start"}>
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
        variant={"outline"}
        colorScheme="blue"
        display={role === "admin" ? "none" : "block"}
        onClick={() => applyCourse(course._id)}
        isDisabled={
          currentCourses?.includes(course._id) || currentCourses?.length === 3
            ? true
            : false
        }
      >
        Apply
      </Button>
      {currentCourses?.includes(course._id) && (
        <Button
          w="full"
          variant={"outline"}
          colorScheme="blue"
          display={role === "admin" ? "none" : "block"}
          onClick={() => navigate("/lectures")}
        >
          View Lectures
        </Button>
      )}
    </Flex>
  );
};

export default CourseCard;
