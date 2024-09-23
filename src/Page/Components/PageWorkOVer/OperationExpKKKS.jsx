import React, { useState, useEffect, useRef } from "react";
import { Box, Badge, Flex, Text, Tr, Td, Button, Icon, useDisclosure } from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IconRotate, IconCheck, IconSettings2, IconChecks } from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

import ProposedWorkTable from "./ProposedWork";
import PerhitunganCard from "../../PageKKKS/Components/Card/CardPerhitunganBox";
import Footer from "../../PageKKKS/Components/Card/Footer";
import { getTableKKKS } from "../../API/APIKKKS";
import { patchStatusOperationToOperate } from "../../API/PostKkks";

const OperationWoKKKS = () => {
  const [countStatus, setCountStatus] = useState(null);
  const [selectedId, setSelectedId] = useState(null); // State untuk menyimpan ID yang akan dioperasikan
  const { isOpen, onOpen, onClose } = useDisclosure(); // State untuk mengontrol alert dialog
  const cancelRef = useRef(); // Ref untuk tombol cancel di dialog

  useEffect(() => {
    const getData = async () => {
      const data = await getTableKKKS("workover", "operation");
      setCountStatus(data.data);
    };
    getData();
  }, []);

  // Fungsi untuk menjalankan patchStatusOperationToOperate setelah konfirmasi
  const handleOperate = async () => {
    try {
      await patchStatusOperationToOperate(selectedId); // Panggil API untuk memperbarui status
      const updatedData = await getTableKKKS("workover", "operation");
      setCountStatus(updatedData.data); // Memperbarui tampilan setelah operasi sukses
      onClose(); // Tutup dialog setelah operasi
    } catch (error) {
      console.error("Failed to update operation status:", error);
    }
  };

  // Fungsi untuk membuka Alert Dialog dan set ID yang ingin dioperasikan
  const openOperateDialog = (id) => {
    setSelectedId(id); // Simpan ID ke state
    onOpen(); // Buka dialog
  };

  const headerstable1 = [
    "NO.",
    "KKKS",
    "LAPANGAN",
    "WILAYAH KERJA",
    "NAMA SUMUR",
    "RENCANA MULAI",
    "RENCANA SELESAI",
    "STATUS",
    "AKSI",
  ];

  const StatusBadge = ({ status }) => {
    const colorScheme =
      status === "PROPOSED"
        ? "blue"
        : status === "APPROVED"
        ? "green"
        : status === "OPERATING"
        ? "blue"
        : "red";

    return (
      <Badge colorScheme={colorScheme} variant="subtle" px={4} py={2} rounded={"full"}>
        {status}
      </Badge>
    );
  };

  return (
    <Flex gap={6} direction={"column"}>
      <Text fontSize={"2em"} fontWeight={"bold"} color={"gray.600"} fontFamily="Montserrat">
        Operasi Work Over
      </Text>

      <Flex gap={6}>
        <PerhitunganCard
          number={countStatus ? countStatus?.summary?.disetujui : 0}
          icon={IconCheck}
          bgIcon="green.100"
          iconColor="green.500"
          label={"DISETUJUI"}
          subLabel="Pekerjaan Disetujui"
        />
        <PerhitunganCard
          number={countStatus ? countStatus?.summary?.beroperasi : 0}
          icon={IconSettings2}
          label={"Beroperasi"}
          subLabel="Pekerjaan Diajukan"
        />
        <PerhitunganCard
          number={countStatus ? countStatus?.summary?.selesai_beroperasi : 0}
          icon={IconChecks}
          bgIcon="red.100"
          iconColor="red.500"
          label={"SELESAI"}
          subLabel="Pekerjaan Dikembalikan"
        />
      </Flex>

      <Box my={6}>
        <ProposedWorkTable headers={headerstable1} title={"Operation Work Over"} subtitle={"List Operation Work Over"}>
          {countStatus ? (
            countStatus.job_details.map((row, index) => (
              <Tr key={row.id}>
                <Td>{index + 1}</Td>
                <Td>{row.KKKS}</Td>
                <Td>{row.LAPANGAN}</Td>
                <Td>{row["WILAYAH KERJA"]}</Td>
                <Td>{row["NAMA SUMUR"]}</Td>
                <Td>{row["RENCANA MULAI"]}</Td>
                <Td>{row["RENCANA SELESAI"]}</Td>
                <Td>
                  <StatusBadge status={row.STATUS} />
                </Td>
                <Td>
                  {/* Tombol Update */}
                 {row.STATUS === "OPERATING" && (
                    <Button
                    leftIcon={<Icon as={FaPen} />}
                    colorScheme="gray"
                    size="sm"
                    mr={2}
                    as={Link}
                    to={`/dashboard/operasiform/${row.id}`}
                    state={{ job_actual: row.ACTUAL_JOB_ID, job_plan_ld: row.JOB_PLAN_ID }}
                    >
                    Update
                  </Button>
                 )}

                  {/* Tombol Operate hanya jika status bukan "OPERATING" */}
                  {row.STATUS === "APPROVED" && (
                    <Button
                      leftIcon={<Icon as={IconRotate} />}
                      colorScheme="blue"
                      size="sm"
                      onClick={() => openOperateDialog(row.id)} // Buka dialog sebelum menjalankan operasi
                    >
                      Operate
                    </Button>
                  )}
                  {row.STATUS === "OPERATING" && (
                    <Button
                      leftIcon={<Icon as={IconRotate} />}
                      colorScheme="blue"
                      isDisabled={true}
                      size="sm"
                      // onClick={() => openOperateDialog(row.id)} // Buka dialog sebelum menjalankan operasi
                    >
                      Operate
                    </Button>
                  )}
                </Td>
              </Tr>
            ))
          ) : (
            <p>Loading ...</p>
          )}
        </ProposedWorkTable>
      </Box>

      {/* Alert Dialog untuk Konfirmasi */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Operasi Konfirmasi
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah Anda yakin ingin mengubah status pekerjaan ini menjadi "OPERATING"?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleOperate} ml={3}>
                Operate
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Footer />
    </Flex>
  );
};

export default OperationWoKKKS;
