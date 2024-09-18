import React, { useEffect, useState, useCallback } from "react";
import ProposedJob from "../Planning/OperasionalID";
import WRMRequirement from "../Planning/WRMRequirement";
import JobOpertionsDays from "../Planning/JobOperationDays";

import WorkBreakDownStructure from "../Planning/BorkBreakDowns";
import HazardType from "../Planning/HazardType";
import JobDocuments from "../Planning/JobDocuments";

const Operasional = ({
  onData,
  // dataWRM,
  jobOperationData,
  jobPlanData,
  TypeOperasionalJob,
  WBSdata,
  HazardTypeData,
  jobDocumentsData,
  formErrors
}) => {
  const [data, setData] = useState({});
  const [datas, setDatas] = useState({});
  // console.log(data);

  useEffect(() => {
    // Menggabungkan data baru dengan data sebelumnya dari parent
    onData(data);

    // dataWRM(datas);
  }, [data, datas]);

  // console.log(data);

  const handleData = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  };

  // const datawrm = useCallback(
  //   (newData) => {
  //     setDatas((prevData) => ({ ...prevData, ...newData }));
  //   },
  //   [setDatas]
  // );

  return (
    <div>
      <ProposedJob
        onData={(e) => setData(e)}
        handleChangeJobPlan={jobPlanData}
        TypeOperasional={TypeOperasionalJob}
        errorForms={formErrors}
      />
      {/* <WRMRequirement datawrm={datawrm} onDataChange={handleData} /> */}
      {/* <WorkBreakDownStructure ondata={WBSdata} errorForms={formErrors} /> */}
      <JobOpertionsDays ondata={jobOperationData} formErrors={formErrors}/>
      <HazardType onDataChange={HazardTypeData} formErrors={formErrors} />
      <JobDocuments data={jobDocumentsData} />
    </div>
  );
};

export default Operasional;
