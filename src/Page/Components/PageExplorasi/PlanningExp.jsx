import React, { useEffect } from "react";
import ProposedWorkTable from "./ProposedWork";
import {
  Box,
  Badge,
  Flex,
  Text,
  Tr,
  Td,
  Button,
  Icon,
  useDisclosure,
  ListItem,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import PerhitunganCard from "../../PageKKKS/Components/Card/CardPerhitunganBox";
import { FaCopy, FaCheck, FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import Footer from "../../PageKKKS/Components/Card/Footer";
// import HeaderCard from "../Components/Card/HeaderCard";
import { getTableKKKS } from "../../API/APIKKKS";
import { UploadFileBatch } from "../../API/PostKkks";
import { Link } from "react-router-dom";
import {
  IconClipboardList,
  IconClipboardCheck,
  IconClipboardOff,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";
import ModalAndContent from "../../Forms/Components/ModalAndContent";
import DragAndDropFile from "../../Forms/Components/DragAndDropFile";
import ModalDelete from "./Components/ModalDelete";

const ModalDeleteContent = ({
  onClose,
  isOpen,
  children,
  title,
  actionButton,
  idJob,
}) => {
  return (
    <ModalAndContent
      onClose={onClose}
      isOpen={isOpen}
      title={title}
      actionButton={actionButton}
    >
      {children}
    </ModalAndContent>
  );
};

const PlanningExpKKKS = () => {
  const [countStatus, setCountStatus] = React.useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const deleteDisclosure = useDisclosure();
  const [selectJob, setSelectJob] = React.useState(null);
  const [errorFile, setErrorFile] = React.useState([]);
  const toast = useToast();
  const [parentFile, setParentFile] = React.useState();
  // console.log('This File Planning',parentFile);

  // console.log("countStatus", selectJob);
  const handleOpenModalDelete = (job) => {
    setSelectJob(job);
    deleteDisclosure.onOpen();
  };
  const UploadFileContent = ({ handleChange }) => {
    const [uploadedFile, setUploadedFile] = React.useState(null);
    console.log("File On Content", uploadedFile);
    const handleFileUpload = (file) => {
      if (file) {
        handleChange(file);
      }
      setUploadedFile(file);
    };

    return (
      <Box p={6}>
        <DragAndDropFile onDrop={handleFileUpload} />
      </Box>
    );
  };

  const ActionToUploadFile = ({ file }) => {
    console.log("File On Button", file);
    const [isLoading, setIsLoading] = React.useState(false);
    const handleSubmit = async () => {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await UploadFileBatch(formData, "exploration");
        console.log(response);
        toast({
          title: "Success",
          description: "File Upload Success",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          window.location.reload();
          setIsLoading(false);
        }, 3000);
      } catch (error) {
        console.error(error);
        if (error.response.status === 400) {
          setErrorFile(error.response.data.detail.errors);
          toast({
            title: "Error",
            description: "File Tidak Sesuai",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsLoading(false);
        }
        if (error.response.status === 500) {
          toast({
            title: "Error",
            description: "Internal Server Error",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setIsLoading(false);
        }
        setIsLoading(false);
      }
    };
    return (
      <Button colorScheme="teal" isLoading={isLoading} onClick={handleSubmit}>
        Upload File
      </Button>
    );
  };

  React.useEffect(() => {
    const getData = async () => {
      const data = await getTableKKKS("exploration", "plan");
      // console.log(data.data)
      setCountStatus(data.data);
    };
    getData();
  }, []);

  const headerstable1 = [
    "NO.",
    "LAPANGAN",
    "WILAYAH KERJA",
    "NAMA SUMUR",
    "RENCANA MULAI",
    "RENCANA SELESAI",
    "STATUS",
    "AKSI",
  ];

  const actionButtonRender = () => {
    return (
      <Flex gap={4}>
        <Button
        
          size={"md"}
          colorScheme="blue"
          leftIcon={<FaCopy />}
        >
          Unduh Format
        </Button>
        <Button
          onClick={onOpen}
          size={"md"}
          colorScheme="blue"
          leftIcon={<FaCopy />}
        >
          Upload Batch
        </Button>
        <Button
          colorScheme="blue"
          variant="solid"
          size="md"
          as={Link}
          to={"/dashboard/planning/form"}
          leftIcon={<IconSquareRoundedPlus />}
        >
          Ajukan Pengajuan
        </Button>
      </Flex>
    );
  };
  const StatusBadge = ({ status }) => {
    const colorScheme =
      status === "PROPOSED"
        ? "blue"
        : status === "APPROVED"
        ? "green"
        : status === "RETURNED"
        ? "red"
        : "gray";

    return (
      <Badge
        colorScheme={colorScheme}
        variant="subtle"
        px={4}
        py={2}
        rounded={"full"}
      >
        {status}
      </Badge>
    );
  };
  return (
    <Flex gap={6} direction={"column"}>
      <Text
        fontSize={"2em"}
        fontWeight={"bold"}
        color={"gray.600"}
        fontFamily="Montserrat"
      >
        Planning Exploration
      </Text>
      <Flex gap={6}>
        <PerhitunganCard
          number={countStatus ? countStatus?.summary?.diajukan : 0}
          icon={IconClipboardList}
          label={"Diajukan"}
          subLabel="Pekerjaan Diajukan"
        />
        <PerhitunganCard
          number={countStatus ? countStatus?.summary?.disetujui : 0}
          icon={IconClipboardCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label={"DISETUJUI"}
          subLabel="Pekerjaan Disetujui"
        />
        <PerhitunganCard
          number={countStatus ? countStatus?.summary?.dikembalikan : 0}
          label={"DIKEMBALIKAN"}
          bgIcon="red.100"
          iconColor="red.500"
          icon={IconClipboardOff}
          subLabel="Pekerjaan Dikembalikan"
        />
      </Flex>
      <Box my={6}>
        <ProposedWorkTable
          headers={headerstable1}
          title={"Planning Exploration"}
          subtitle={"List Planning Exploration"}
          actionButton={actionButtonRender()}
        >
          {countStatus ? (
            countStatus.job_details.map((row, index) => (
              <>
                <Tr key={row.id}>
                  <Td>{index + 1}</Td>
                  <Td>{row.LAPANGAN}</Td>
                  <Td>{row["WILAYAH KERJA"]}</Td>
                  <Td>{row["NAMA SUMUR"]}</Td>
                  <Td>{row["RENCANA MULAI"]}</Td>
                  <Td>{row["RENCANA SELESAI"]}</Td>
                  <Td>
                    <StatusBadge status={row.STATUS} />
                  </Td>
                  <Td>
                    <Button
                      leftIcon={<Icon as={FaEye} />}
                      colorScheme="gray"
                      size="sm"
                      mr={2}
                    >
                      View
                    </Button>
                    <Button
                      leftIcon={<Icon as={FaTrash} />}
                      colorScheme="red"
                      size="sm"
                      mr={2}
                      onClick={() => handleOpenModalDelete(row)}  
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              </>
            ))
          ) : (
            <p>Loading ...</p>
          )}
        </ProposedWorkTable>
        <ModalDelete
          isOpen={deleteDisclosure.isOpen}
          onClose={deleteDisclosure.onClose}
          JobName={selectJob ? selectJob["NAMA SUMUR"] : []["NAMA SUMUR"]}
          idJob={selectJob?.id}
        />
        <ModalAndContent
          onClose={onClose}
          isOpen={isOpen}
          title="Upload Exploration Planning"
          actionButton={<ActionToUploadFile file={parentFile} />}
          scrollBehavior="inside"
        > 
          <UploadFileContent handleChange={(e) => setParentFile(e)} />
          {parentFile && (
            <Box mt={4} p={4} border="1px solid" borderColor="gray.200">
              <Text fontSize="lg">Uploaded File:</Text>
              <Text>Name: {parentFile.name}</Text>
              <Text>Size: {(parentFile.size / 1024).toFixed(2)} KB</Text>
            </Box>
          )}
          <UnorderedList>
            {errorFile &&
              errorFile.map((err, index) => (
                <ListItem key={index} color="red.500">
                  {err}
                </ListItem>
              ))}
          </UnorderedList>
        </ModalAndContent>
      </Box>
      <Footer />
    </Flex>
  );
};

export default PlanningExpKKKS;
