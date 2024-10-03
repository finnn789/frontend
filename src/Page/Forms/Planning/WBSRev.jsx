import React from "react";
import CardFormK3 from "../Components/CardFormK3";
import FormControlCard from "../Components/FormControl";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import TableComponent from "../Components/TableComponent";
import TableDataForm from "../Components/TableDataForm";

const TableWBSRev = ({ onChange, dataTable }) => {
  React.useEffect(() => {
    setTableData(dataTable);
  }, [dataTable]);

  const toast = useToast();
  const [tableData, setTableData] = React.useState([]);
  console.log("Table Data wkwk", tableData);
  const [data, setData] = React.useState({
    event: "",
    start_date: "",
    end_date: "",
    remarks: "",
  });

  const handleAddDataTable = () => {
    // Memeriksa jika ada field data yang kosong
    if (!data.event || !data.start_date || !data.end_date || !data.remarks) {
      toast({
        title: "Field ",
        description: "Tolong isi semua field yang diperlukan.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return; // Menghentikan fungsi jika ada field yang kosong
    }

    const updatedTableData = [...tableData, data];
    setTableData(updatedTableData);
    onChange(updatedTableData);
    setData({
      event: "",
      start_date: "",
      end_date: "",
      remarks: "",
    });
  };

  const updateField = React.useCallback((field, value) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }, []);
  return (
    <Box>
      <FormControlCard
        labelForm="Event"
        type="text"
        value={data.event}
        onChange={(e) => updateField("event", e.target.value)}
      />
      <Flex gap={4}>
        <FormControlCard
          labelForm="Start Date"
          type="date"
          value={data.start_date}
          onChange={(e) => updateField("start_date", e.target.value)}
        />
        <FormControlCard
          labelForm="End Date"
          type="date"
          value={data.end_date}
          onChange={(e) => updateField("end_date", e.target.value)}
        />
      </Flex>
      <FormControlCard
        labelForm="Remarks"
        type="text"
        isTextArea
        value={data.remarks}
        onChange={(e) => updateField("remarks", e.target.value)}
      />
      <Flex justifyContent="flex-end" mt={2}>
        <Button colorScheme="blue" onClick={handleAddDataTable}>
          Add
        </Button>
      </Flex>
    </Box>
  );
};

const InputWBSRequirement = ({
  titleWRM,
  onChange,
  CheckedValue,
  onChangeField,
}) => {
  const [isChecked, setIsChecked] = React.useState(false);
  React.useEffect(() => {
    onChange(isChecked);
  }, [isChecked]);

  const [wrmValue, setWrmValue] = React.useState({
    start_date: "",
    end_date: "",
    remarks: "",
  });

  React.useEffect(() => {
    onChangeField(wrmValue);
  }, [wrmValue]);

  const handleChange = (value, field) => {
    setWrmValue({ ...wrmValue, [field]: value });
  };
  return (
    <GridItem>
      <Grid templateColumns={"repeat(2, 1fr)"}>
        <GridItem>
          <Box alignContent={"center"} w={"full"} h={"full"}>
            <Checkbox
              isChecked={CheckedValue}
              onChange={(e) => setIsChecked(e.target.checked)}
            >
              <Text fontSize="xl" fontFamily="Montserrat">
                {titleWRM}
              </Text>
            </Checkbox>
          </Box>
        </GridItem>
        <GridItem>
          <Flex gap={4}>
            <FormControlCard
              labelForm=""
              type={"date"}
              isDisabled={!CheckedValue}
              onChange={(e) => handleChange(e.target.value, "start_date")}
            />
            <FormControlCard
              labelForm=""
              type={"date"}
              isDisabled={!CheckedValue}
              onChange={(e) => handleChange(e.target.value, "end_date")}
            />
            <FormControlCard
              labelForm=""
              type={"text"}
              isDisabled={!CheckedValue}
              onChange={(e) => handleChange(e.target.value, "remarks")}
            />
          </Flex>
        </GridItem>
      </Grid>
    </GridItem>
  );
};
const WBSRev = ({ WRMValue=(e)=>console.log('this Value WRM',e) }) => {
  const [dataTable, setDataTable] = React.useState([]);
  const [dataWRMRequire, setDataWRMRequire] = React.useState({
    wrm_pembebasan_lahan: false,
    wrm_ippkh: false,
    wrm_ukl_upl: false,
    wrm_amdal: false,
    wrm_pengadaan_rig: false,
    wrm_pengadaan_drilling_services: false,
    wrm_pengadaan_lli: false,
    wrm_persiapan_lokasi: false,
    wrm_internal_kkks: false,
    wrm_evaluasi_subsurface: false,
  });

  const [dataFieldWRM, setDataFieldWRM] = React.useState({});
  React.useEffect(() => {
    WRMValue(dataFieldWRM);
  }, [dataFieldWRM]);
  // console.log("WBSRev", dataWRMRequire);
  const handleChangeOfData = (data, name) => {
    setDataWRMRequire((prev) => ({ ...prev, [name]: data }));

    if (!data) {
      // Jika CheckedValue berubah menjadi false, hapus dataFieldWRM terkait
      setDataFieldWRM((prev) => {
        const newState = { ...prev };
        delete newState[name];
        return newState;
      });
    }
  };

  const handleWRMValue = (fieldData, name) => {
    if (dataWRMRequire[name]) {
      setDataFieldWRM((prev) => ({ ...prev, [name]: fieldData }));
    }
  };
  // console.log("Table Data", dataFieldWRM);

  const header = [
    {
      Header: "Event",
      accessor: "event",
      type: "text",
    },
    {
      Header: "Start Date",
      accessor: "start_date",
      type: "date",
    },
    {
      Header: "End Date",
      accessor: "end_date",
      type: "date",
    },
    {
      Header: "Remarks",
      accessor: "remarks",
      type: "text",
    },
  ];

  return (
    <CardFormK3 title="Work Breakdown Structure" mt={2} subtitle="WBS">
      <Grid templateColumns={"repeat(1, 1fr)"} mx={2}>
        <GridItem>
          <Grid templateColumns={"repeat(2, 1fr)"}>
            <GridItem>
              <Box alignContent={"center"} w={"full"} h={"full"}>
                <Text fontSize="xl" fontWeight="bold" fontFamily="Montserrat">
                  WBS
                </Text>
              </Box>
            </GridItem>
            <GridItem>
              <Flex gap={4}>
                <Text
                  flex={1}
                  fontSize="xl"
                  fontWeight="bold"
                  fontFamily="Montserrat"
                >
                  Start Date
                </Text>
                <Text
                  flex={1}
                  fontSize="xl"
                  fontWeight="bold"
                  fontFamily="Montserrat"
                >
                  End Date
                </Text>
                <Text
                  flex={1}
                  fontSize="xl"
                  fontWeight="bold"
                  fontFamily="Montserrat"
                >
                  Remarks
                </Text>
              </Flex>
            </GridItem>
          </Grid>
        </GridItem>

        <InputWBSRequirement
          titleWRM={"Pembebasan Lahan"}
          onChangeField={(e) => handleWRMValue(e, "wrm_pembebasan_lahan")}
          CheckedValue={dataWRMRequire.wrm_pembebasan_lahan}
          onChange={(e) => handleChangeOfData(e, "wrm_pembebasan_lahan")}
        />
        <InputWBSRequirement
          titleWRM={"Izin PPKH"}
          onChangeField={(e) => handleWRMValue(e, "wrm_ippkh")}
          CheckedValue={dataWRMRequire.wrm_ippkh}
          onChange={(e) => handleChangeOfData(e, "wrm_ippkh")}
        />
        <InputWBSRequirement
          titleWRM={"UKL & UPL"}
          onChangeField={(e) => handleWRMValue(e, "wrm_ukl_upl")}
          CheckedValue={dataWRMRequire.wrm_ukl_upl}
          onChange={(e) => handleChangeOfData(e, "wrm_ukl_upl")}
        />
        <InputWBSRequirement
          titleWRM={"AMDAL"}
          CheckedValue={dataWRMRequire.wrm_amdal}
          onChangeField={(e) => handleWRMValue(e, "wrm_amdal")}
          onChange={(e) => handleChangeOfData(e, "wrm_amdal")}
        />
        <InputWBSRequirement
          titleWRM={"Pengadaan Rig"}
          onChangeField={(e) => handleWRMValue(e, "wrm_pengadaan_rig")}
          CheckedValue={dataWRMRequire.wrm_pengadaan_rig}
          onChange={(e) => handleChangeOfData(e, "wrm_pengadaan_rig")}
        />
        <InputWBSRequirement
          titleWRM={"Pengadaan Drilling Service"}
          onChangeField={(e) =>
            handleWRMValue(e, "wrm_pengadaan_drilling_services")
          }
          CheckedValue={dataWRMRequire.wrm_pengadaan_drilling_services}
          onChange={(e) =>
            handleChangeOfData(e, "wrm_pengadaan_drilling_services")
          }
        />
        <InputWBSRequirement
          titleWRM={"Pengadaan LLI"}
          onChangeField={(e) => handleWRMValue(e, "wrm_pengadaan_lli")}
          CheckedValue={dataWRMRequire.wrm_pengadaan_lli}
          onChange={(e) => handleChangeOfData(e, "wrm_pengadaan_lli")}
        />
        <InputWBSRequirement
          titleWRM={"Internal KKKS"}
          onChangeField={(e) => handleWRMValue(e, "wrm_internal_kkks")}
          CheckedValue={dataWRMRequire.wrm_internal_kkks}
          onChange={(e) => handleChangeOfData(e, "wrm_internal_kkks")}
        />
        <InputWBSRequirement
          titleWRM={"Evaluasi Subsurface"}
          onChangeField={(e) => handleWRMValue(e, "wrm_evaluasi_subsurface")}
          CheckedValue={dataWRMRequire.wrm_evaluasi_subsurface}
          onChange={(e) => handleChangeOfData(e, "wrm_evaluasi_subsurface")}
        />

        {/* <GridItem mt={4}>
          <SimpleGrid columns={2} gap={4}>
            <CardFormK3 title="" subtitle="" icon={null}>
              <TableWBSRev
                onChange={(e) => setDataTable(e)}
                dataTable={dataTable}
              />
            </CardFormK3>
            <CardFormK3 title="" subtitle="" icon={null}>
              <TableDataForm
                data={dataTable}
                headers={header}
                onDataChange={(e) => setDataTable(e)}
              />
            </CardFormK3>
          </SimpleGrid>
        </GridItem> */}
      </Grid>
    </CardFormK3>
  );
};

export default WBSRev;
