import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";

import WRMRequirement from "./FormParent.jsx/WRMRequirement";

import OperationalParent from "./FormParent.jsx/Operational";
import Technical from "./FormParent.jsx/Technical";
import DailyReport from "./FormParent.jsx/DailyReport";

import FinishOperation from "./FormParent.jsx/FinishOperation";
import { useParams, useLocation } from "react-router-dom";
import { getViewRawPlanning } from "../../API/APIKKKS";

const OperationFormsKKKS = () => {
  const { job_id } = useParams();
  const location = useLocation();
  const [tabsIndex, setTabsIndex] = React.useState(0);



  const { job_actual } = location.state || {};

  React.useEffect(() => {
    const getViewRawPlannings = async () => {
      if (job_id) {
        try {
          const data = await getViewRawPlanning(job_id);
          setDataViewRaw(data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    getViewRawPlannings();
  }, [job_id]);

  const [dataViewRaw, setDataViewRaw] = React.useState({});
  // console.log("Data View Raw", dataViewRaw);

  return (
    <div>
      <Flex px={4}>
        <Heading>Job Report</Heading>
        <Box ml={"auto"}>
          {/* <Button colorScheme="green" px={8}fontSize={18} size={"md"}>Update</Button>{" "} */}
        </Box>
      </Flex>
      <Box mt={4} fontFamily={"Montserrat"}>
        {}
        <Tabs onChange={(index) => setTabsIndex(index)} index={tabsIndex}>
          <TabList>
            <Tab>WRM</Tab>
            <Tab>Operational</Tab>
            <Tab>Technical</Tab>
            <Tab>Daily Operation Report</Tab>
            <Tab>Finish Operation</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <WRMRequirement job_id={job_id} job_actual={job_actual} />
            </TabPanel>
            <TabPanel>
              <OperationalParent job_id={job_id} DataRaw={dataViewRaw} />
            </TabPanel>
            <TabPanel>
              <Technical job_id={job_id} />
            </TabPanel>
            <TabPanel>
              <DailyReport job_id={job_id} />
            </TabPanel>
            <TabPanel>
              <FinishOperation />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default OperationFormsKKKS;
