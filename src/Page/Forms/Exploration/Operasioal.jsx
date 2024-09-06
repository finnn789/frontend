import React, { useEffect, useState } from "react";
import ProposedJob from "../Planning/OperasionalID";
import WRMRequirement from "../Planning/WRMRequirement";
import JobOpertionsDays from "../Planning/JobOperationDays";

import WorkBreakdownStructure from "../Planning/BorkBreakDowns";
import HazardType from "../Planning/HazardType";
import JobDocuments from "../Planning/JobDocuments";

const Operasional = ({ onData, dataWRM, jobDocuments }) => {
  const [data, setData] = useState({});
  const [datas, setDatas] = useState({});
  // console.log(data);

  useEffect(() => {
    // Menggabungkan data baru dengan data sebelumnya dari parent
    onData(data);
    dataWRM(datas);
  }, [datas,data]);

  // console.log(data);

  const handleData = (newData) => {    
    setData((prevData) => ({ ...prevData, ...newData }));
  };

  const datawrm = (newData) => {
    setDatas((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <div>
      <ProposedJob onData={handleData} />
      <WRMRequirement onDataChange={datawrm} />
      <WorkBreakdownStructure
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

      <JobDocuments
        data={(newData) => {
          jobDocuments(newData);
        }}
      />
    </div>
  );
};

export default Operasional;
