import {
  Box,
  Grid,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import CardFormK3 from "../Components/CardFormK3";
import FormControlCard from "../Components/FormControl";
import { IconBrightness } from "@tabler/icons-react";
import GridLayout from "../Layout/GridLayout";
import { SelectComponent } from "../Components/SelectOption";
import WRMUpdates from "./FormHandling/WRMUpdates";
import WRMUissues from "./FormHandling/WRMUissues";
import WRMRequirement from "./FormParent.jsx/WRMRequirement";
import AreaWell from "./FormHandling/AreaWell";
import WellProfile from "./FormHandling/WellProfile";
import OperationalParent from "./FormParent.jsx/Operational";
import Technical from "./FormParent.jsx/Technical";
import DailyReport from "./FormParent.jsx/DailyReport";
import TimeBreakdown from "./FormHandling/TimeBreakdown";
import FinishOperation from "./FormParent.jsx/FinishOperation";

const OperationFormsKKKS = () => {
  
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
              <DailyReport />
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
