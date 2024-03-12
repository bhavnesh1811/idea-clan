import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LectureCard from "../components/LectureCard";
import { useDispatch, useSelector } from "react-redux";
import { getAlllectures } from "../redux/lectures/lecture.action";
import Loader from "../components/Loader";

const Lectures = () => {
  const [lectureData, setLectureData] = useState([]);
  const dispatch = useDispatch();
  const { lectures, lecture_loading } = useSelector(
    (store) => store.lectureReducer
  );
  const role = sessionStorage.getItem("role");
  useEffect(() => {
    dispatch(getAlllectures());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setLectureData(lectures);
    // eslint-disable-next-line
  }, [lectures]);
  // console.log(lectureData, lectures);
  return (
    <Box p={3} mx="auto">
      <Heading as="h1" size="xl" my="16px">
        Available Lectures
      </Heading>
      {lecture_loading ? (
        <Loader />
      ) : (
        <TableContainer >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Title</Th>
                {role === "admin" && (
                  <>
                    <Th>Edit</Th>
                    <Th>Delete</Th>
                  </>
                )}
                <Th>Watch</Th>
              </Tr>
            </Thead>
            <Tbody>
              {lectureData &&
                lectureData?.map((lecture, index) => (
                  <LectureCard {...lecture} key={index} />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Lectures;
