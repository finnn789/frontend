import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import { FaCheck, FaOilWell } from "react-icons/fa6";
import FormInputFile from "../../Components/FormInputFile";
import { Button, useToast } from "@chakra-ui/react";
import { PostUploadFile } from "../../../API/PostKkks";

const WellSchematic = () => {
  const [files, setFiles] = React.useState(null);
  const toast = useToast();
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    setIsSuccess(false);
  }, [files]);

  const handleUpload = async () => {
    try {
      const file = new FormData();
      file.append("file", files);
      const response = await PostUploadFile(file);
      if (response.status === 200) {
        console.log(response.data);
        toast({
          title: "Success",
          description: "File Upload Success",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsSuccess(true);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "File Tidak Sesuai",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <CardFormK3
        title="Well Schematic"
        subtitle="Well Schematic"
        icon={FaOilWell}
      >
        <FormInputFile
          onFileSelect={(file) => setFiles(file)}
          label="Upload File"
          acceptedFormats=".pdf"
          acceptedOption={["PDF", "CSV"]}
        />
        <Button
          colorScheme={isSuccess ? "green" : "blue"}
          onClick={isSuccess ? null : handleUpload}
          leftIcon={isSuccess ? <FaCheck /> : null }
        >
          Upload
        </Button>
      </CardFormK3>
    </div>
  );
};

export default WellSchematic;
