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
  const [currentCourses, setCurrentCourses] = useState([]);

  const getUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/getusers`, config);
      // console.log(res?.data?.user[0]?.currentCourses);
      setCurrentCourses(res?.data?.user[0]?.currentCourses);
    } catch (error) {
      console.log(error);
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
          <Text>You have applied for {currentCourses?.length?currentCourses?.length:0} courses (Max Limit:3)</Text>
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
            courseData?.map((course, index) => (
              <CourseCard
                key={index}
                course={course}
                currentCourses={currentCourses}
                setCurrentCourses={setCurrentCourses}
              />
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default Courses;
