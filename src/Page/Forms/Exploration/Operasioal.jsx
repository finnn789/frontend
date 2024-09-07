import React, { useEffect, useState } from "react";
import ProposedJob from "../Planning/OperasionalID";
import WRMRequirement from "../Planning/WRMRequirement";
import JobOpertionsDays from "../Planning/JobOperationDays";

import WorkBreakdownStructure from "../Planning/BorkBreakDowns";
import HazardType from "../Planning/HazardType";
import JobDocuments from "../Planning/JobDocuments";

const Operasional = ({ onData, dataWRM, jobDocuments,handleChangeRigType,handleChangeJobPlan,WBSData,JobOperationData,HazardTypeData }) => {
  const [data, setData] = useState({});
  const [datas, setDatas] = useState({});
  // console.log(data);

  useEffect(() => {
    // Menggabungkan data baru dengan data sebelumnya dari parent
    onData(data);
    // dataWRM(datas);
  }, [ data]);

  // console.log(data);

  const handleData = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
  };

  const datawrm = (newData) => {
    setDatas((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <div>
      <ProposedJob
        onData={(newData) => {
          setData((prevJobPlan) => ({
            ...prevJobPlan, // Mempertahankan data sebelumnya
            ...newData, // Menambahkan atau memperbarui dengan data baru
          }));
        }}
        handleChangeRigType={handleChangeRigType}
        // handleChangeWPBYear = {handleChangeWPBYear}
        handleChangeJobPlan={handleChangeJobPlan}
      />
      <WRMRequirement onDataChange={datawrm} />
      <WorkBreakdownStructure
        ondata={WBSData}
      />
      <JobOpertionsDays
        ondata={JobOperationData}
      />
      <HazardType
        onDataChange={HazardTypeData}
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
