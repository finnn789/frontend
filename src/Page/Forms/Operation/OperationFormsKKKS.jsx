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
  const { job_actual } = location.state || {};
  const [tabsIndex, setTabsIndex] = React.useState(0);

  const wrmRef = React.useRef();
  const technicalRef = React.useRef();
  const operationalRef = React.useRef();
  const dailyRef = React.useRef();

  console.log("OperationAl", dailyRef);

  // console.log(tabsIndex)

  const handleUpdate = () => {
    switch (tabsIndex) {
      case 0:
        wrmRef.current.handleSubmit();
        break;
      case 1:
        operationalRef.current.handleSave();
        break;
      case 2:
        technicalRef.current.handleSave();
        break;
      case 3:
        dailyRef.current.postData();
        break;
      default:
        break;
    }
  };

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
          <Button
            colorScheme="green"
            onClick={handleUpdate}
            px={8}
            fontSize={18}
            size={"md"}
          >
            Update
          </Button>{" "}
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
              <WRMRequirement
                ref={wrmRef}
                job_id={job_id}
                job_actual={job_actual}
              />
            </TabPanel>
            <TabPanel>
              {Object.keys(dataViewRaw).length > 0 ? (
                <OperationalParent
                  ref={operationalRef}
                  job_id={job_id}
                  DataRaw={dataViewRaw}
                />
              ) : (
                <p>Loading...</p>
              )}
            </TabPanel>
            <TabPanel>
              {Object.keys(dataViewRaw).length > 0 ? (
                <Technical
                  ref={technicalRef}
                  job_id={job_id}
                  DataRaw={dataViewRaw}
                />
              ) : (
                <p>Loading...</p>
              )}
            </TabPanel>
            <TabPanel>
              <DailyReport ref={dailyRef} job_id={job_id} />
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
