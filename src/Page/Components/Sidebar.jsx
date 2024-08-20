// src/Components/Sidebar.jsx
import React from "react";
import { Box, VStack, Link, Image, List, ListItem, Collapse, Icon, Text } from "@chakra-ui/react";
import { FaHome, FaTools, FaFileAlt, FaMap, FaChevronDown, FaChevronRight, FaWrench } from "react-icons/fa";
import Logo from '../../assets/logo.png';

const Sidebar = () => {
  const [isPlanningOpen, setIsPlanningOpen] = React.useState(false);

  return (
    <Box bg="white" w="250px" h="100vh" p={4} color="#10042C" boxShadow="md">
      <Box flex={1} margin={"auto"} justifyItems={"center"} w={"fit-content"} marginBottom={"30px"}>
        <Image src={Logo} alt="SKK Migas" w={"120px"} />
      </Box>
      <VStack align="start" spacing={4}>
        <Link
          px={4}
          py={4}
          rounded="md"
          _hover={{ bg: "#f5f5f5" }}
          width="full"
          display="flex"
          alignItems="center"
        >
          <Icon as={FaHome} mr={2} />
          Dashboard
        </Link>

        <Box width="full">
          <Link
            px={4}
            py={4}
            rounded="md"
            _hover={{ bg: "#f5f5f5" }}
            width="full"
            display="flex"
            alignItems="center"
            onClick={() => setIsPlanningOpen(!isPlanningOpen)}
          >
            <Icon as={FaFileAlt} mr={2} />
            Job Planning
            <Box ml="auto">
              {isPlanningOpen ? <FaChevronDown /> : <FaChevronRight />}
            </Box>
          </Link>
          <Collapse in={isPlanningOpen}>
            <List spacing={2} pl={4} mt={2} styleType="none">
              <ListItem>
                <Link
                  px={3}
                  py={2}
                  rounded="md"
                  _hover={{ bg: "#e0e0e0" }}
                  display="flex"
                  alignItems="center"
                  bg="#f9f9f9"
                >
                  <Icon as={FaWrench} mr={2} />
                  <Text>Planning Drilling</Text>
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  px={3}
                  py={2}
                  rounded="md"
                  _hover={{ bg: "#e0e0e0" }}
                  display="flex"
                  alignItems="center"
                  bg="#f9f9f9"
                >
                  <Icon as={FaWrench} mr={2} />
                  <Text>Planning WOWS</Text>
                </Link>
              </ListItem>
            </List>
          </Collapse>
        </Box>

        <Link
          px={4}
          py={4}
          rounded="md"
          _hover={{ bg: "#f5f5f5" }}
          width="full"
          display="flex"
          alignItems="center"
        >
          <Icon as={FaTools} mr={2} />
          Operations
        </Link>
        <Link
          px={4}
          py={4}
          rounded="md"
          _hover={{ bg: "#f5f5f5" }}
          width="full"
          display="flex"
          alignItems="center"
        >
          <Icon as={FaFileAlt} mr={2} />
          PPP
        </Link>
        <Link
          px={4}
          py={4}
          rounded="md"
          _hover={{ bg: "#f5f5f5" }}
          width="full"
          display="flex"
          alignItems="center"
        >
          <Icon as={FaFileAlt} mr={2} />
          Closeout
        </Link>
        <Link
          px={4}
          py={4}
          rounded="md"
          _hover={{ bg: "#f5f5f5" }}
          width="full"
          display="flex"
          alignItems="center"
        >
          <Icon as={FaFileAlt} mr={2} />
          Data Well
        </Link>
        <Link
          px={4}
          py={4}
          rounded="md"
          _hover={{ bg: "#f5f5f5" }}
          width="full"
          display="flex"
          alignItems="center"
        >
          <Icon as={FaMap} mr={2} />
          GIS
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
