import React, { useEffect, useState,useCallback } from "react";
import ProposedJob from "../Planning/OperasionalID";
import WRMRequirement from "../Planning/WRMRequirement";
import JobOpertionsDays from "../Planning/JobOperationDays";

import WorkBreakDownStructure from "../Planning/BorkBreakDowns";
import HazardType from "../Planning/HazardType";
import JobDocuments from "../Planning/JobDocuments";

const Operasional = ({ onData, dataWRM, jobDocuments }) => {
  const [data, setData] = useState({});
  const [datas, setDatas] = useState({});
  // console.log(data);

  useEffect(() => {
    // Menggabungkan data baru dengan data sebelumnya dari parent
    onData((prevData) => ({
      ...prevData,
      ...data,
    }));

    dataWRM((prevDatas) => ({
      ...prevDatas,
      ...datas,
    }));
  }, [data, datas]);

  // console.log(data);

  const handleData = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  };

  const datawrm = useCallback((newData) => {
    setDatas((prevData) => ({ ...prevData, ...newData }));
  }, [setDatas]);


  
  return (
    <div>
      <ProposedJob onData={handleData} />
      <WRMRequirement onDataChange={datawrm} />
      <WorkBreakDownStructure
        ondata={(newData) => {
          setData((prevJobPlan) => ({
            ...prevJobPlan,
            job_plan: {
              ...prevJobPlan.job_plan,
              job_operation_days: newData,
            },
          }));
        }}
      />
      <JobOpertionsDays
        ondata={(newData) => {
          setData((prevJobPlan) => ({
            ...prevJobPlan,
            job_plan: {
              ...prevJobPlan.job_plan,
              work_breakdown_structure: newData,
            },
          }));
        }}
      />
      <HazardType
        onDataChange={(newData) => {
          setData((prevJobPlan) => ({
            ...prevJobPlan,
            job_plan: {
              ...prevJobPlan.job_plan,
              job_hazard: newData,
            },
          }));
        }}
      />

      {/* <JobDocuments
        data={(newData) => {
          jobDocuments(newData);
        }}
      /> */}
    </div>
  );
};

export default Operasional;
