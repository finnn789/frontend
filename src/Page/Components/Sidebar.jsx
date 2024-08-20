import React from "react";
import { Box, VStack, Link, Image, List, ListItem, Collapse, Icon, Text } from "@chakra-ui/react";
import { FaHome, FaTools, FaFileAlt, FaMap, FaChevronDown, FaChevronRight, FaWrench } from "react-icons/fa";
import Logo from '../../assets/logo.png';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = React.useState(null);

  const handleMenuClick = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

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

        {/* Exploration Section */}
        <Box width="full">
          <Link
            px={4}
            py={4}
            rounded="md"
            _hover={{ bg: "#f5f5f5" }}
            width="full"
            display="flex"
            alignItems="center"
            onClick={() => handleMenuClick('exploration')}
          >
            <Icon as={FaFileAlt} mr={2} />
            Exploration
            <Box ml="auto">
              {openMenu === 'exploration' ? <FaChevronDown /> : <FaChevronRight />}
            </Box>
          </Link>
          <Collapse in={openMenu === 'exploration'}>
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
                  onClick={() => setIsPageController('planning')}
                >
                  <Icon as={FaWrench} mr={2} />
                  <Text>Submission</Text>
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
                  <Text>Operations</Text>
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
                  <Text>Submission</Text>
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
                  <Text>Operations</Text>
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
                  <Text>P3</Text>
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
                  <Text>Close Out</Text>
                </Link>
              </ListItem>
            </List>
          </Collapse>
        </Box>

        {/* Exploitation Section */}
        <Box width="full">
          <Link
            px={4}
            py={4}
            rounded="md"
            _hover={{ bg: "#f5f5f5" }}
            width="full"
            display="flex"
            alignItems="center"
            onClick={() => handleMenuClick('exploitation')}
          >
            <Icon as={FaFileAlt} mr={2} />
            Exploitation
            <Box ml="auto">
              {openMenu === 'exploitation' ? <FaChevronDown /> : <FaChevronRight />}
            </Box>
          </Link>
          <Collapse in={openMenu === 'exploitation'}>
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
                  <Text>Submission</Text>
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
                  <Text>Operations</Text>
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
                  <Text>P3</Text>
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
                  <Text>Close Out</Text>
                </Link>
              </ListItem>
            </List>
          </Collapse>
        </Box>

        {/* Work Over Section */}
        <Box width="full">
          <Link
            px={4}
            py={4}
            rounded="md"
            _hover={{ bg: "#f5f5f5" }}
            width="full"
            display="flex"
            alignItems="center"
            onClick={() => handleMenuClick('workover')}
          >
            <Icon as={FaFileAlt} mr={2} />
            Work Over
            <Box ml="auto">
              {openMenu === 'workover' ? <FaChevronDown /> : <FaChevronRight />}
            </Box>
          </Link>
          <Collapse in={openMenu === 'workover'}>
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
                  <Text>Submission</Text>
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
                  <Text>Operations</Text>
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
                  <Text>P3</Text>
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
                  <Text>Close Out</Text>
                </Link>
              </ListItem>
            </List>
          </Collapse>
        </Box>

        {/* Well Service Section */}
        <Box width="full">
          <Link
            px={4}
            py={4}
            rounded="md"
            _hover={{ bg: "#f5f5f5" }}
            width="full"
            display="flex"
            alignItems="center"
            onClick={() => handleMenuClick('wellservice')}
          >
            <Icon as={FaFileAlt} mr={2} />
            Well Service
            <Box ml="auto">
              {openMenu === 'wellservice' ? <FaChevronDown /> : <FaChevronRight />}
            </Box>
          </Link>
          <Collapse in={openMenu === 'wellservice'}>
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
                  <Text>Submission</Text>
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
                  <Text>Operations</Text>
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
                  <Text>P3</Text>
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
                  <Text>Close Out</Text>
                </Link>
              </ListItem>
            </List>
          </Collapse>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;
