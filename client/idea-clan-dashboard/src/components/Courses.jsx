import { Box, Grid, Heading, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../redux/courses/course.action";
import CourseCard from "./CourseCard";

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, course_loading } = useSelector(
    (store) => store.courseReducer
  );
  useEffect(() => {
    dispatch(getAllCourses());
    // eslint-disable-next-line
  }, []);
  return (
    <Box p={3} mx="auto">
      <VStack spacing={8} align="center">
        <Heading as="h1" size="xl">
          Available Courses
        </Heading>
        {course_loading ? (
          "Loading"
        ) : (
          <Grid
            gridTemplateColumns={{
              base: "repeat(1,1fr)",
              sm: "repeat(2,1fr)",
              xl: "repeat(3,1fr)",
            }}
            gap="16px"
          >
            {courses &&
              courses.map((course, index) => (
                <CourseCard {...course} key={index} />
              ))}
          </Grid>
        )}
      </VStack>
    </Box>
  );
};

export default Courses;
