import React from "react";
import { Tr, Td, useToast } from "@chakra-ui/react";
import EditLecture from "../modals/EditLecture";
import { MdDelete } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import { deletelectureDetails } from "../redux/lectures/lecture.action";
import { useDispatch } from "react-redux";

const LectureCard = (lecture) => {
  const role = sessionStorage.getItem("role");
  const dispatch = useDispatch();
  const toast = useToast();
  const deleteLecture = (lectureId) => {
    dispatch(deletelectureDetails(lectureId)).then(({ message }) => {
      if (message === "success") {
        toast({
          title: "Lecture Details Deleted",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
      }
      if (message === "error") {
        toast({
          title: "Lecture Details Not Deleted",
          status: "error",
          duration: 3000,
          position: "top-right",
        });
      }
    });
  };
  return (
    <Tr cursor={"pointer"}>
      <Td>{lecture?.name}</Td>
      <Td>{lecture?.title}</Td>
      {role === "admin" && (
        <>
          <Td>
            <EditLecture {...lecture} />
          </Td>
          <Td>
            <MdDelete onClick={()=>deleteLecture(lecture._id)}/>
          </Td>
        </>
      )}
      <Td>
        <BiSolidShow />
      </Td>
    </Tr>
  );
};

export default LectureCard;
