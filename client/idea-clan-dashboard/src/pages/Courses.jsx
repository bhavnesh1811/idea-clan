import { Box, Flex, Grid, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../redux/courses/course.action";
import CourseCard from "../components/CourseCard";
import Loader from "../components/Loader";
import AddCourse from "../modals/AddCourse";

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, course_loading } = useSelector(
    (store) => store.courseReducer
  );
  const [courseData, setCourseData] = useState([]);
  const role = sessionStorage.getItem("role") || "";
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
        <Flex  justifyContent={"flex-end"} mb="16px">
          <AddCourse />
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
