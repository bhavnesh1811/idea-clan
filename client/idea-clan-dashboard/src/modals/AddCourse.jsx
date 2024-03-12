import { AddIcon } from "@chakra-ui/icons";
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
  Flex,
  Text,
  Input,
  FormLabel,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddCourse = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration:""
  });

  const resetFormData = () => {
    setFormData({
      title: "",
      description: "",
      duration: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const addCourse = () => {
    dispatch(addUserCourse(formData)).then(({ message }) => {
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
    resetFormData();
  };
  return (
    <>
      <Flex
        alignItems="center"
        border="1px solid blue"
        borderRadius="12px"
        gap="8px"
        onClick={onOpen}
        p="4px 12px"
      >
        <AddIcon />
        <Text textStyle={"body1"}>Add New</Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Course Form</ModalHeader>
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
            <Button onClick={addCourse} size="sm" variant="primary">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCourse;
