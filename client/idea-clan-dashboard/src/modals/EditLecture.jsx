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
  import { editlectureDetails } from "../redux/lectures/lecture.action";
  
  function EditLecture(lecture) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const toast = useToast();
    const [formData, setFormData] = useState({
      title: lecture.title,
      name: lecture.name,
      instructor: lecture.instructor,
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleEdit = () => {
      dispatch(editlectureDetails(lecture._id, formData)).then(({ message }) => {
        if (message === "success") {
          toast({
            title: "lecture Details Updated",
            status: "success",
            duration: 3000,
            position: "top-right",
          });
        }
        if (message === "error") {
          toast({
            title: "lecture Details Not Updated",
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
            <ModalHeader>Edit lecture</ModalHeader>
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
                <FormLabel htmlFor="name">name :</FormLabel>
                <Input
                  placeholder="Enter name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="instructor">instructor :</FormLabel>
                <Input
                  placeholder="Enter instructor"
                  name="instructor"
                  value={formData.instructor}
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
  
  export default EditLecture;
  