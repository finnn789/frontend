import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import CardFormK3 from '../../Components/CardFormK3';
import FormControlCard from '../../Components/FormControl';
import { set } from 'lodash';

const TableComponent = ({ data, headers }) => {
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            {headers.map((column, index) => (
              <Th key={index}>{column.Header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {headers.map((column, colIndex) => (
                <Td key={colIndex}>
                  {column.render ? column.render(row, rowIndex) : row[column.accessor]}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const WellStratigraphyForm = ({ data, onChange }) => {
  const datas = data?.data;

  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    unit_type: "Metrics",
    depth_datum: "RT",
    top_depth: 0,
    bottom_depth: 0,
    formation_name: "",
    lithology: "",
  });

  useEffect(() => {
    if (datas?.job_plan?.well?.well_stratigraphy) {
      setTableData(datas.job_plan.well.well_stratigraphy);
    }
  }, [datas]);

  const handleChangeData = (name, type) => (e) => {
    let value = e.target.value;
    if (type === "number") {
      value = value.includes(".") ? parseFloat(value) : parseInt(value, 10);
      if (isNaN(value)) value = "";
    } else if (type === "text") {
      value = String(value);
    }

    setFormData((prevData) => {
      const newData = { ...prevData };
      set(newData, name, value);
      return newData;
    });
  };

  const handleAddData = () => {
    const updatedTableData = [...tableData, { ...formData }];
    setTableData(updatedTableData);
    setFormData({
      unit_type: "Metrics",
      depth_datum: "RT",
      top_depth: 0,
      bottom_depth: 0,
      formation_name: "",
      lithology: "",
    });
    onChange("job_plan.well.well_stratigraphy", updatedTableData);
  };

  const handleDelete = (index) => {
    const updatedTableData = tableData.filter((_, idx) => idx !== index);
    setTableData(updatedTableData);
    onChange("job_plan.well.well_stratigraphy", updatedTableData);
  };

  const headers = [
    { Header: "Top Depth", accessor: "top_depth" },
    { Header: "Bottom Depth", accessor: "bottom_depth" },
    { Header: "Depth Datum", accessor: "depth_datum" },
    { Header: "Formation Name", accessor: "formation_name" },
    { Header: "Lithology", accessor: "lithology" },
    {
      Header: "Action",
      accessor: "actions",
      render: (row, rowIndex) => (
        <Button
          colorScheme="red"
          variant="solid"
          onClick={() => handleDelete(rowIndex)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} fontFamily="Montserrat">
      <GridItem>
        <CardFormK3
          title="Well Stratigraphy"
          padding="36px 28px"
          subtitle="Stratigraphy Details"
          OptionDepth={["MSL", "KB", "GL"]}
          OptionValue={(e) =>
            setFormData((prev) => ({ ...prev, depth_datum: e.target.value }))
          }
        >
          <Flex gap={2}>
            <FormControlCard
              labelForm="Top Depth"
              placeholder="Enter Top Depth"
              type="number"
              value={formData.top_depth}
              handleChange={handleChangeData("top_depth", "number")}
            />
            <FormControlCard
              labelForm="Bottom Depth"
              placeholder="Enter Bottom Depth"
              type="number"
              value={formData.bottom_depth}
              handleChange={handleChangeData("bottom_depth", "number")}
            />
          </Flex>
          <Flex gap={2}>
            <FormControlCard
              labelForm="Formation Name"
              placeholder="Enter Formation Name"
              type="text"
              value={formData.formation_name}
              handleChange={handleChangeData("formation_name", "text")}
            />
            <FormControlCard
              labelForm="Lithology"
              placeholder="Enter Lithology"
              type="text"
              value={formData.lithology}
              handleChange={handleChangeData("lithology", "text")}
            />
          </Flex>
          <Flex mt={4}>
            <Button colorScheme="blue" variant="solid" onClick={handleAddData}>
              Add
            </Button>
          </Flex>
        </CardFormK3>
      </GridItem>

      <GridItem>
        <Box rounded="lg" overflowX="auto" borderWidth="1px" p={0}>
          <Tabs>
            <TabList>
              <Tab>Table</Tab>
            </TabList>
            <TabPanel>
              <Box maxH="510px">
                <TableComponent data={tableData} headers={headers} />
              </Box>
            </TabPanel>
          </Tabs>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default WellStratigraphyForm;
