import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import FormInputFile from "../../Components/FormInputFile";
import { useToast, Button } from "@chakra-ui/react";
import axios from "axios";
const WellLogsCard = () => {
  const [formData, setFormData] = React.useState({});
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
    setLoading(true);
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
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CardFormK3 title="Well Logs" subtitle="Well Logs">
      <FormInputFile
        acceptedOption={["csv", "xlsx", "xls"]}
        label="Well Logs"
        onFileSelect={(e) => handleFile(e)}
      />
      <Button colorScheme="blue" onClick={UploadFile}>
        Upload
      </Button>
    </CardFormK3>
  );
};

export default WellLogsCard;
