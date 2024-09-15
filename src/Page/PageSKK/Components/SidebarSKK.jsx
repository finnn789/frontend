import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Image,
  Collapse,
  Icon,
  Button,
  Flex,
  Tooltip,
  useDisclosure,Text
} from "@chakra-ui/react";
import {
  IconHome,
  IconTools,
  IconMap,
  IconTool,
  IconSettings,
  IconHammer,
  IconChevronDown,
  IconChevronRight,
  IconChevronLeft,
  IconBrain,
  IconClipboardData,
} from "@tabler/icons-react";
import Logo from "../../../assets/logo.png";
import { useLocation, Link, useNavigate } from "react-router-dom";

const SidebarKKS = ({ handleMenuValue }) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const [onClickPage, setOnClickPage] = useState("");
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("/dashboard/submission")) {
      setOnClickPage("submission");
    } else if (location.pathname.includes("/dashboard/operasi")) {
      setOnClickPage("operation");
    } else if (location.pathname.includes("/dashboard/ppp")) {
      setOnClickPage("ppp");
    } else if (location.pathname.includes("/dashboard")) {
      setOnClickPage("homeDash");
    }
  }, [location.pathname]);

  const handleMenuClick = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <Flex
      direction="row"
      h="100vh"
      display={{ base: "none", md: "flex" }}
      position={"sticky"}
      top={0}
    >
      <Box
        bg="white"
        w={isOpen ? "250px" : "90px"}
        h="100vh"
        p={4}
        color="#10042C"
        boxShadow="0px 1px 2px rgba(0, 0, 0, 0.10)"
        position="sticky"
        top={0}
        overflowY="auto"
        fontFamily="Montserrat"
        transition="width 0.3s ease"
        borderRight="1px solid #e0e0e0"
      >
        <Box mb="30px" textAlign="center">
          <Image
            src={Logo}
            alt="SKK Migas"
            w={isOpen ? "120px" : "40px"}
            m="auto"
            transition="width 0.3s ease"
          />
        </Box>
        <Button
          flexDirection={isOpen ? "row" : "column"}
          onClick={onToggle}
          bg="transparent"
          _hover={{ bg: "#e0e0e0" }}
          mb="20px"
          alignSelf="flex-end"
        >
          <Icon as={isOpen ? IconChevronLeft : IconChevronRight} />
        </Button>
        <VStack align="start" spacing={4}>
          <SidebarItem
            icon={IconHome}
            label="Dashboard"
            isOpen={isOpen}
            link="/skk/dashboard"
            selected={onClickPage === "homeDash"}
            tooltip="Dashboard"
          />
          <SidebarMenu
            label="Exploration"
            icon={IconMap}
            isOpen={isOpen}
            isExpanded={openMenu === "exploration"}
            onToggle={() => handleMenuClick("exploration")}
            tooltip="Exploration"
          >
            <SidebarSubItem
              label="Planning"
              link="/skk/exploration/planningexploration"
              selected={onClickPage === "submission"}
              isOpen={isOpen}
              icon={IconTool}
              tooltip="Planning Exploration"
            />
            <SidebarSubItem
              label="Operasional"
              link="/skk/exploration/operationexploration"
              selected={onClickPage === "operation"}
              isOpen={isOpen}
              icon={IconSettings}
              tooltip="Operational Exploration"
            />
            <SidebarSubItem
              label="PPP"
              link="/skk/exploration/pppexploration"
              selected={onClickPage === "ppp"}
              isOpen={isOpen}
              icon={IconTool}
              tooltip="PPP Exploration"
            />
            <SidebarSubItem
              label="AFE Close Out"
              link="/skk/exploration/closeoutexploration"
              selected={onClickPage === "closeout"}
              isOpen={isOpen}
              icon={IconSettings}
              tooltip="AFE Close Out Exploration"
            />
          </SidebarMenu>
          <SidebarMenu
            label="Development"
            icon={IconTools}
            isOpen={isOpen}
            isExpanded={openMenu === "development"}
            onToggle={() => handleMenuClick("development")}
            tooltip="Development"
          >
            <SidebarSubItem
              label="Planning"
              link="/skk/development/planningdevelopment"
              selected={onClickPage === "planningDevelopment"}
              isOpen={isOpen}
              icon={IconTool}
              tooltip="Planning Development"
            />
            <SidebarSubItem
              label="Operasional"
              link="/skk/development/operationsdevelopment"
              selected={onClickPage === "operationsDevelopment"}
              isOpen={isOpen}
              icon={IconSettings}
              tooltip="Operational Development"
            />
            <SidebarSubItem
              label="PPP"
              link="/skk/development/pppdevelopment"
              selected={onClickPage === "pppDevelopment"}
              isOpen={isOpen}
              icon={IconTool}
              tooltip="PPP Development"
            />
            <SidebarSubItem
              label="AFE Close Out"
              link="/skk/development/closeoutdevelopment"
              selected={onClickPage === "closeoutDevelopment"}
              isOpen={isOpen}
              icon={IconSettings}
              tooltip="AFE Close Out Development"
            />
          </SidebarMenu>
          <SidebarMenu
            label="Work Over"
            icon={IconHammer}
            isOpen={isOpen}
            isExpanded={openMenu === "workover"}
            onToggle={() => handleMenuClick("workover")}
            tooltip="Work Over"
          >
            <SidebarSubItem
              label="Planning"
              link="/skk/workover/planningworkover"
              selected={onClickPage === "planningWorkover"}
              isOpen={isOpen}
              icon={IconTool}
              tooltip="Planning Work Over"
            />
            <SidebarSubItem
              label="Operasional"
              link="/skk/workover/operationsworkover"
              selected={onClickPage === "operationsWorkover"}
              isOpen={isOpen}
              icon={IconSettings}
              tooltip="Operational Work Over"
            />
            <SidebarSubItem
              label="PPP"
              link="/skk/workover/pppworkover"
              selected={onClickPage === "pppWorkover"}
              isOpen={isOpen}
              icon={IconTool}
              tooltip="PPP Work Over"
            />
            <SidebarSubItem
              label="AFE Close Out"
              link="/skk/workover/closeoutworkover"
              selected={onClickPage === "closeoutWorkover"}
              isOpen={isOpen}
              icon={IconSettings}
              tooltip="AFE Close Out Work Over"
            />
          </SidebarMenu>
          <SidebarMenu
            label="Well Service"
            isOpen={isOpen}
            isExpanded={openMenu === "wellservice"}
            onToggle={() => handleMenuClick("wellservice")}
            tooltip="Well Service"
          >
            <SidebarSubItem
              label="Planning"
              link="/skk/wellservice/planningwellservice"
              selected={onClickPage === "planningWellService"}
              isOpen={isOpen}
              icon={IconTool}
              tooltip="Planning Well Service"
            />
            <SidebarSubItem
              label="Operasional"
              link="/skk/wellservice/operationswellservice"
              selected={onClickPage === "operationsWellService"}
              isOpen={isOpen}
              icon={IconSettings}
              tooltip="Operational Well Service"
            />
            <SidebarSubItem
              label="PPP"
              link="/skk/wellservice/pppwellservice"
              selected={onClickPage === "pppWellService"}
              isOpen={isOpen}
              icon={IconTool}
              tooltip="PPP Well Service"
            />
            <SidebarSubItem
              label="AFE Close Out"
              link="/skk/wellservice/closeoutwellservice"
              selected={onClickPage === "closeoutWellService"}
              isOpen={isOpen}
              icon={IconSettings}
              tooltip="AFE Close Out Well Service"
            />
          </SidebarMenu>
          <SidebarItem
            label="DA & ML"
            icon={IconBrain}
            isOpen={isOpen}
            link="#"
            tooltip="Data Analytics & Machine Learning"
          />
          <SidebarItem
            label="Laporan"
            icon={IconClipboardData}
            isOpen={isOpen}
            link="#"
            tooltip="Laporan"
          />
        </VStack>
      </Box>
    </Flex>
  );
};

// Komponen Sidebar Item
const SidebarItem = ({ icon, label, link, selected, isOpen, tooltip }) => (
  <Tooltip label={tooltip} placement="right">
    <Button
      as={Link}
      to={link}
      px={4}
      py={2}
      rounded="md"
      width="full"
      justifyContent="flex-start"
      display="flex"
      alignItems="center"
      variant="ghost"
      bg={selected ? "#e0e0e0" : "transparent"}
      _hover={{ bg: "#d0d0d0", transform: "scale(1.02)" }}
      textAlign="left"
      transition="all 0.3s"
      gap={2}
    >
      <Icon as={icon} boxSize={isOpen ? 5 : 6} />
      {isOpen && <Text>{label}</Text>}
    </Button>
  </Tooltip>
);

// Komponen Sidebar SubItem untuk submenu
const SidebarSubItem = ({ icon, label, link, selected, isOpen, tooltip }) => (
  <Tooltip label={tooltip} placement="right">
    <Button
      as={Link}
      to={link}
      pl={8} // Padding kiri lebih besar untuk membedakan submenu
      py={2}
      rounded="md"
      width="full"
      justifyContent="flex-start"
      display="flex"
      alignItems="center"
      variant="ghost"
      bg={selected ? "#e0e0e0" : "transparent"}
      _hover={{ bg: "#f0f0f0", transform: "scale(1.02)" }}
      textAlign="left"
      transition="all 0.3s"
      gap={2}
    >
      <Icon as={icon} boxSize={isOpen ? 5 : 6} />
      {isOpen && <Text>{label}</Text>}
    </Button>
  </Tooltip>
);

// Komponen Sidebar Menu
const SidebarMenu = ({ label, icon, children, isOpen, isExpanded, onToggle, tooltip }) => (
  <Tooltip label={tooltip} placement="right">
    <Box width="full">
      <Button
        px={4}
        py={2}
        rounded="md"
        width="full"
        justifyContent="space-between" // Mengatur rightIcon berada di sebelah kanan
        alignItems="center"
        display="flex"
        onClick={onToggle}
        variant="ghost"
        _hover={{ bg: "#d0d0d0", transform: "scale(1.02)" }}
        textAlign="left"
        transition="all 0.3s"
      >
        <Flex alignItems="center" gap={2}>
          <Icon as={icon} boxSize={isOpen ? 5 : 6} />
          {isOpen && <Text>{label}</Text>}
        </Flex>
        {isExpanded ? <Icon as={IconChevronDown} /> : <Icon as={IconChevronRight} />}
      </Button>
      <Collapse in={isExpanded}>{children}</Collapse>
    </Box>
  </Tooltip>
);

export default SidebarKKS;
