import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormInputFile from "../../Components/FormInputFile";
import { useToast, Button } from "@chakra-ui/react";
import axios from "axios";

const MudLogsCard = ({onDataChange}) => {
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const handleFile = React.useCallback(
    (data) => {
      setFile(data);
    },
    [setFile]
  );

  const UploadFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_URL}/utils/upload/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CardFormK3 title="Mud Logs" subtitle="Mud Logs">
      <FormInputFile
        acceptedOption={["csv", "xlsx", "xls"]}
        label="Mud Logs"
        onFileSelect={(e) => handleFile(e)}
      />
      <Button colorScheme="blue" onClick={UploadFile}>
        Upload
      </Button>
    </CardFormK3>
  );
};

export default MudLogsCard;
