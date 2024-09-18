// TeknisForm.jsx
import React from "react";
import { Box } from "@chakra-ui/react";
import ExistingWell from "../Planning/ExistingWell"; // Sesuaikan path sesuai dengan struktur folder Anda

const TeknisForm = ({ formErrors, dataExistingWell }) => {
  return (
    <Box>
      <ExistingWell
        formErrors={formErrors}
        dataExistingWell={dataExistingWell}
      />
    </Box>
  );
};

export default TeknisForm;
