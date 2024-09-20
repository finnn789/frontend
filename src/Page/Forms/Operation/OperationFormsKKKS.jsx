import {
  Box,
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
import { useParams } from "react-router-dom";

const OperationFormsKKKS = () => {
  const { job_id } = useParams();

  return (
    <div>
      <Heading>+ Job Report</Heading>

      <Box mt={4} fontFamily={"Montserrat"}>
        <Tabs>
          <TabList>
            <Tab>WRM</Tab>
            <Tab>Operational</Tab>
            <Tab>Technical</Tab>
            <Tab>Daily Operation Report</Tab>
            <Tab>Finish Operation</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <WRMRequirement />
            </TabPanel>
            <TabPanel>
              <OperationalParent />
            </TabPanel>
            <TabPanel>
              <Technical />
            </TabPanel>
            <TabPanel>
              <DailyReport job_id={job_id}/>
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
