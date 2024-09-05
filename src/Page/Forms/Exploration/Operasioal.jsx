import React, { useEffect, useState } from "react";
import ProposedJob from "./Card/OperasionalID";
import WRMRequirement from "./Card/WRMRequirement";
import JobOpertionsDays from "./Card/JobOperationDays";

import WorkBreakdownStructure from "./Card/BorkBreakDowns";
import HazardType from "./Card/HazardType";

const Operasional = ({ onData, dataWRM }) => {
  const [data, setData] = useState({});
  const [datas, setDatas] = useState({});
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
    </div>
  );
};

export default Operasional;
