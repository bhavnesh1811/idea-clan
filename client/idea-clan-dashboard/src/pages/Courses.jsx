import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../redux/courses/course.action";
import CourseCard from "../components/CourseCard";
import Loader from "../components/Loader";
import AddCourse from "../modals/AddCourse";
import axios from "axios";
import { config } from "../configs/config";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, course_loading } = useSelector(
    (store) => store.courseReducer
  );
  const [courseData, setCourseData] = useState([]);
  const role = sessionStorage.getItem("role") || "";
  const currentCourses = sessionStorage.getItem("currentCourses") || [];
  const getUser = async () => {
    try {
     
      console.log(BASE_URL,config);
      const res = await axios.get(`${BASE_URL}/users/getusers`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error,"25");
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    dispatch(getAllCourses());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setCourseData(courses);
    // eslint-disable-next-line
  }, [courses]);
  return (
    <Box p={3} mx="auto">
      <Heading as="h1" size="xl" my="16px">
        Available Courses
      </Heading>
      {role === "admin" && (
        <Flex justifyContent={"flex-end"} mb="16px">
          <AddCourse />
        </Flex>
      )}
      {role === "student" && (
        <Flex justifyContent={"flex-end"} mb="16px">
          <Text>You have applied for {currentCourses?.length} courses</Text>
        </Flex>
      )}
      {course_loading ? (
        <Loader />
      ) : (
        <Grid
          gridTemplateColumns={{
            base: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            xl: "repeat(3,1fr)",
          }}
          gap="16px"
        >
          {courseData &&
            courseData.map((course, index) => (
              <CourseCard {...course} key={index} />
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default Courses;
