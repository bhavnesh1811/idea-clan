import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormLabel,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { editCourseDetails } from "../redux/courses/course.action";

function EditCourse(course) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    duration: course.duration,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    dispatch(editCourseDetails(course._id, formData)).then(({ message }) => {
      if (message === "success") {
        toast({
          title: "Course Details Updated",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
      }
      if (message === "error") {
        toast({
          title: "Course Details Not Updated",
          status: "error",
          duration: 3000,
          position: "top-right",
        });
      }
    });
    onClose();
  };

  return (
    <>
      <MdEdit onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Course</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormLabel htmlFor="title">Title :</FormLabel>
              <Input
                placeholder="Enter Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="description">Description :</FormLabel>
              <Input
                placeholder="Enter Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Box>
            <Box>
              <FormLabel htmlFor="duration">Duration :</FormLabel>
              <Input
                placeholder="Enter Duration"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleEdit}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditCourse;
