import { IoMdAdd } from "react-icons/io";
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
  Grid,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLectureDetails } from "../redux/lectures/lecture.action";
import { getAllCourses } from "../redux/courses/course.action";

const AddLecture = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const { courses } = useSelector((store) => store.courseReducer);
  useEffect(() => {
    dispatch(getAllCourses());
    // eslint-disable-next-line
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    instructor: "",
    start: "",
    end: "",
    description: "",
    link: "",
    course: "",
  });

  const resetFormData = () => {
    setFormData({
      title: "",
      name: "",
      instructor: "",
      start: "",
      end: "",
      description: "",
      link: "",
      course: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const addLecture = () => {
    // console.log(formData);
    if (
      formData.title.trim() === "" ||
      formData.name.trim() === "" ||
      formData.instructor.trim() === "" ||
      formData.description.trim() === "" ||
      formData.start.trim() === "" ||
      formData.end.trim() === "" ||
      formData.link.trim() === "" ||
      formData.course.trim() === ""
    ) {
      return toast({
        title: "Please fill All Fields",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
    }
    dispatch(addLectureDetails(formData)).then(({ message }) => {
      if (message === "success") {
        toast({
          title: "Lecture Details Added",
          status: "success",
          duration: 3000,
          position: "top-right",
        });
      }
      if (message === "error") {
        toast({
          title: "Lecture Details Not Added",
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
        cursor={"pointer"}
      >
        <IoMdAdd />
        <Text>Add New</Text>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Lecture Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              gap="16px"
              gridTemplateColumns={{
                base: "repeat(1,1fr)",
                md: "repeat(2,1fr)",
              }}
            >
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
                <FormLabel htmlFor="name">Name :</FormLabel>
                <Input
                  placeholder="Enter name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="instructor">Instructor :</FormLabel>
                <Input
                  placeholder="Enter instructor"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="link">Link :</FormLabel>
                <Input
                  placeholder="Enter Link"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="start">Start : </FormLabel>
                <Input
                  placeholder="Enter start"
                  type="time"
                  name="start"
                  value={formData.start}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="end">End : </FormLabel>
                <Input
                  placeholder="Enter end"
                  type="time"
                  name="end"
                  value={formData.end}
                  onChange={handleInputChange}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="course">Course : </FormLabel>
                <Select
                  name="course"
                  onChange={handleInputChange}
                  value={formData.course}
                >
                  {courses &&
                    courses.map((course) => (
                      <option key={course?._id} value={course?._id}>
                        {course?.title}
                      </option>
                    ))}
                </Select>
              </Box>
            </Grid>
            <Box>
              <FormLabel htmlFor="description">Description : </FormLabel>
              <Textarea
                placeholder="Enter Description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={addLecture} size="sm" variant="primary">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddLecture;
