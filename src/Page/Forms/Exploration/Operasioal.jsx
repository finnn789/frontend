import React, { useEffect, useState } from "react";
import ProposedJob from "../Planning/OperasionalID";
import WRMRequirement from "../Planning/WRMRequirement";
import JobOpertionsDays from "../Planning/JobOperationDays";

import WorkBreakdownStructure from "../Planning/BorkBreakDowns";
import HazardType from "../Planning/HazardType";
import JobDocuments from "../Planning/JobDocuments";
import WBSRev from "../Planning/WBSRev";


const Operasional = ({ onData, dataWRM, jobDocuments,handleChangeRigType,handleChangeJobPlan,WBSData,JobOperationData,HazardTypeData, CuttingDumping, errorForms,unitType }) => {
  const [data, setData] = useState({});
  const [datas, setDatas] = useState({});
  // console.log(data);

  useEffect(() => {
    // Menggabungkan data baru dengan data sebelumnya dari parent
    onData(data);
    dataWRM(datas);
  }, [ data, datas]);

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
        errorForms={errorForms}
        onData={(newData) => {
          setData((prevJobPlan) => ({
            ...prevJobPlan, // Mempertahankan data sebelumnya
            ...newData, // Menambahkan atau memperbarui dengan data baru
          }));
        }}
        handleChangeRigType={handleChangeRigType}
      
        handleChangeJobPlan={handleChangeJobPlan}
        
      />
      <WRMRequirement onDataChange={datawrm} showCuttingDumpingCheckbox={CuttingDumping} errorForms={errorForms} />
      {/* <WorkBreakdownStructure
        errorForms={errorForms}
        ondata={WBSData}
      /> */}
      <WBSRev/> 


      <JobOpertionsDays
        errorForms={errorForms}
        ondata={JobOperationData}
        unitType={unitType}
      />
      <HazardType
        errorForms={errorForms}
        onDataChange={HazardTypeData}
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
