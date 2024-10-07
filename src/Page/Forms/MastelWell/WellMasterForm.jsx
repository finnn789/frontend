import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Select,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import WellDetail from "./FormHandling/WellDetail";
import WellLocation from "./FormHandling/WellLocation";
import KeyDates from "./FormHandling/KeyDates";
import WellStratigraphy from "./FormHandling/WellStratigraphy";
import WellCasing from "./FormHandling/WellCasing";
import WellDocuments from "./FormHandling/WellDocuments";
import WellLogs from "./FormHandling/WellLogs";
import ElevationsAndDepths from "./FormHandling/ElevationAndDepths";
import WellTrajectory from "./FormHandling/WellTrajetory";
import WellSummary from "./FormHandling/WellSummary";
import WellDrillingParameter from "./FormHandling/WellDrillingParameter";
import WellGeneralInfo from "./FormHandling/WellGeneralInfo";
import { postWellMaster } from "../../API/PostKkks";

const WellMasterForm = () => {
  const [formData, setFormData] = useState({ unit_type: "Metrics" }); // Menambahkan unit_type ke dalam formData
  const prevFormData = useRef(formData);
  const toast = useToast(); // Hook Chakra UI untuk menampilkan toast notification

  // State untuk AlertDialog
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef();

  // Fungsi handleChange generik yang dapat digunakan oleh semua field, termasuk array dan non-array
  const handleChange = useCallback(
    (field, newData, { isArray = false, wrapField = true } = {}) => {
      setFormData((prev) => {
        let updatedData;

        if (!wrapField) {
          updatedData = { ...prev, ...newData };
        } else {
          if (isArray) {
            updatedData = { ...prev, [field]: newData };
          } else {
            updatedData = { ...prev, [field]: newData };
          }
        }

        if (JSON.stringify(prev[field]) === JSON.stringify(newData)) {
          return prev;
        }
        return updatedData;
      });
    },
    []
  );

  const updateUnitType = (newUnitType) => {
    setFormData((prev) => {
      const updatedData = { ...prev, unit_type: newUnitType };

      const fieldsToUpdate = [
        "well_casing",
        "well_summary",
        "well_stratigraphy",
        "well_drilling_parameter",
      ];

      fieldsToUpdate.forEach((field) => {
        if (Array.isArray(updatedData[field])) {
          updatedData[field] = updatedData[field].map((item) => ({
            ...item,
            unit_type: newUnitType,
          }));
        } else if (typeof updatedData[field] === "object" && updatedData[field]) {
          updatedData[field] = { ...updatedData[field], unit_type: newUnitType };
        }
      });

      return updatedData;
    });
  };

  const handleWellDetailChange = useCallback((data) => handleChange(null, data, { wrapField: false }), [handleChange]);
  const handleWellLocationChange = useCallback((data) => handleChange(null, data, { wrapField: false }), [handleChange]);
  const handleKeyDatesChange = useCallback((data) => handleChange(null, data, { wrapField: false }), [handleChange]);
  const handleElevationAndDepthChange = useCallback((data) => handleChange(null, data, { wrapField: false }), [handleChange]);
  const handleGeneralInfoChange = useCallback((data) => handleChange(null, data, { wrapField: false }), [handleChange]);

  const handleWellCasingChange = useCallback((data) => handleChange("well_casing", data), [handleChange]);
  const handleWellStratigraphyChange = useCallback((data) => handleChange("well_stratigraphy", data), [handleChange]);
  const handleWellSummaryChange = useCallback((data) => handleChange("well_summary", data), [handleChange]);

  const handleLogChange = useCallback(
    (data) => {
      handleChange("well_logs", data);
    },
    [handleChange]
  );

  const handleDocumentChange = useCallback(
    (data) => {
      handleChange("well_documents", data, { isArray: true });
    },
    [handleChange]
  );

  const handleWellTrajectoryChange = useCallback(
    (data) => {
      handleChange("well_trajectory", data);
    },
    [handleChange]
  );

  const handleWellDrillingParameterChange = useCallback(
    (data) => {
      handleChange("well_drilling_parameter", data);
    },
    [handleChange]
  );

  useEffect(() => {
    if (JSON.stringify(formData) !== JSON.stringify(prevFormData.current)) {
      prevFormData.current = formData;
    }
  }, [formData]);

  // Fungsi untuk mengirim data ke API menggunakan `postWellMaster`
  const handleSubmit = async () => {
    try {
      const response = await postWellMaster(formData);
      if (response) {
        toast({
          title: "Data Created Successfully.",
          description: "Well Master data has been successfully created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "An error occurred while creating Well Master data.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating Well Master data.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Fungsi untuk membuka AlertDialog
  const onOpenAlert = () => setIsAlertOpen(true);

  // Fungsi untuk menutup AlertDialog
  const onCloseAlert = () => setIsAlertOpen(false);

  // Fungsi untuk konfirmasi submit data
  const confirmSubmit = () => {
    onCloseAlert();
    handleSubmit();
  };

  const codeAreaId = formData.area_id;
  return (
    <Box style={{ padding: "20px" }}>
      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          {/* Dropdown untuk memilih unit_type */}
          <FormControl>
            <FormLabel>Unit Type</FormLabel>
            <Select
              value={formData.unit_type}
              onChange={(e) => updateUnitType(e.target.value)}
            >
              <option value="Metrics">Metrics</option>
              <option value="Imperial">Imperial</option>
            </Select>
          </FormControl>
        </HStack>

        <WellGeneralInfo handleChange={handleGeneralInfoChange} errorForms={{}} />

        {/* Gunakan handler generik `handleChange` untuk semua komponen child */}
        <WellDetail onChange={handleWellDetailChange} />
        <WellLocation handleChange={handleWellLocationChange} errorForms={{}} />
        <KeyDates handleChange={handleKeyDatesChange} errorForms={{}} />
        <WellStratigraphy handleChange={handleWellStratigraphyChange} errorForms={{}} codeAreaId={codeAreaId} />
        <WellCasing handleChange={handleWellCasingChange} errorForms={{}} />
        <WellDocuments onDocumentChange={handleDocumentChange} />
        <WellLogs onLogChange={handleLogChange} />
        <ElevationsAndDepths handleChange={handleElevationAndDepthChange} />
        <WellTrajectory ondata={handleWellTrajectoryChange} />
        <WellSummary handleChange={handleWellSummaryChange} />
        <WellDrillingParameter onParameterChange={handleWellDrillingParameterChange} />

        {/* Tombol Submit untuk membuka AlertDialog */}
        <Button colorScheme="blue" onClick={onOpenAlert} mt={4}>
          Submit
        </Button>

        {/* AlertDialog untuk konfirmasi submit */}
        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={onCloseAlert}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirm Submission
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to submit this Well Master data?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onCloseAlert}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={confirmSubmit} ml={3}>
                  Submit
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        {/* Tampilkan data dari child components */}
        <h2>Data Form yang Diterima:</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </VStack>
    </Box>
  );
};

export default WellMasterForm;
