import React, { useState, useEffect, useRef } from "react";
import CardFormK3 from "../../Components/CardFormK3";
import GridLayout from "../../Layout/GridLayout";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";
import { IconBrightness } from "@tabler/icons-react";
import { patchWRM, getWRMData } from "../../../../Page/API/APISKK";
import {
  Button,
  Spinner,
  Center,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

const WRMUpdates = ({ job_actual }) => {
  const [values, setValues] = useState(null); // State untuk menyimpan data WRM yang diambil dari API
  const [loading, setLoading] = useState(false); // State untuk status loading
  const toast = useToast(); // Inisialisasi toast Chakra UI

  // State kontrol untuk AlertDialog
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const ValueOption = [
    { value: "100%", label: "100%" },
    { value: "95%", label: "95%" },
    { value: "90%", label: "90%" },
    { value: "85%", label: "85%" },
    { value: "80%", label: "80%" },
    { value: "75%", label: "75%" },
    { value: "70%", label: "70%" },
    { value: "65%", label: "65%" },
    { value: "60%", label: "60%" },
    { value: "55%", label: "55%" },
    { value: "50%", label: "50%" },
    { value: "45%", label: "45%" },
    { value: "40%", label: "40%" },
    { value: "35%", label: "35%" },
    { value: "30%", label: "30%" },
    { value: "25%", label: "25%" },
    { value: "20%", label: "20%" },
    { value: "15%", label: "15%" },
    { value: "10%", label: "10%" },
    { value: "5%", label: "5%" },
    { value: "0%", label: "0%" },
  ];

  console.log("dari wrmupdates", job_actual);
  
  // Fetch WRM data saat komponen di-load berdasarkan job_actual
  useEffect(() => {
    if (job_actual) {
      const fetchData = async () => {
        setLoading(true); // Set status loading menjadi true
        try {
          const response = await getWRMData(job_actual, "exploration"); // Memanggil fungsi getWRMData dari file lain
          if (response) {
            setValues(response); // Set data respons ke state
          } else {
            setValues(null); // Jika respons tidak valid, set values ke null
          }
        } catch (error) {
          console.error("Error fetching WRM data", error);
          setValues(null); // Set nilai default jika error
        } finally {
          setLoading(false); // Selesai loading
        }
      };

      fetchData();
    }
  }, [job_actual]);

  // Handle perubahan pada select
  const handleSelectChange = (name) => (e) => {
    const newValue = e.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  // Fungsi untuk submit data ke patch WRM
  const handleSubmit = async () => {
    if (!job_actual) {
      console.error("job_actual is required");
      return;
    }

    try {
      const response = await patchWRM(job_actual, values); // Mengirim data state `values` ke patchWRM
      console.log("Data updated successfully", response);
      toast({
        title: "WRM Data Updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Tutup AlertDialog setelah submit
    } catch (error) {
      console.error("Failed to update data", error);
    }
  };

  // Fungsi untuk membuka dialog konfirmasi submit
  const handleOpenSubmitDialog = () => {
    onOpen(); // Membuka AlertDialog
  };

  // Jika sedang loading, tampilkan spinner
  if (loading) {
    return (
      <Center mt={4}>
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <div>
      <CardFormK3 title={"WRM Updates"} icon={IconBrightness} subtitle="WRM">
        <GridLayout Columns={1} Gap={2}>
          <GridLayout.Item>
            {values && (
              <>
                <SelectComponent
                  label="Pembebasan Lahan"
                  name="wrm_pembebasan_lahan"
                  placeholder="Select Pembebasan Lahan"
                  value={values.wrm_pembebasan_lahan || ""}
                  onChange={handleSelectChange("wrm_pembebasan_lahan")}
                  align="Horizontal"
                >
                  {ValueOption.map((option, index) => (
                    <SelectOption key={index} value={option.value} label={option.label} />
                  ))}
                </SelectComponent>

                <SelectComponent
                  label="Izin PPKH"
                  name="wrm_ippkh"
                  placeholder="Select Izin PPKH"
                  value={values.wrm_ippkh || ""}
                  onChange={handleSelectChange("wrm_ippkh")}
                  align="Horizontal"
                  mt={4}
                >
                  {ValueOption.map((option, index) => (
                    <SelectOption key={index} value={option.value} label={option.label} />
                  ))}
                </SelectComponent>

                <SelectComponent
                  label="UKL & UPL"
                  name="wrm_ukl_upl"
                  placeholder="Select UKL & UPL"
                  value={values.wrm_ukl_upl || ""}
                  onChange={handleSelectChange("wrm_ukl_upl")}
                  align="Horizontal"
                  mt={4}
                >
                  {ValueOption.map((option, index) => (
                    <SelectOption key={index} value={option.value} label={option.label} />
                  ))}
                </SelectComponent>

                <SelectComponent
                  label="AMDAL"
                  name="wrm_amdal"
                  placeholder="Select AMDAL"
                  value={values.wrm_amdal || ""}
                  onChange={handleSelectChange("wrm_amdal")}
                  align="Horizontal"
                  mt={4}
                >
                  {ValueOption.map((option, index) => (
                    <SelectOption key={index} value={option.value} label={option.label} />
                  ))}
                </SelectComponent>

                <SelectComponent
                  label="Pengadaan Rig"
                  name="wrm_pengadaan_rig"
                  placeholder="Select Pengadaan Rig"
                  value={values.wrm_pengadaan_rig || ""}
                  onChange={handleSelectChange("wrm_pengadaan_rig")}
                  align="Horizontal"
                  mt={4}
                >
                  {ValueOption.map((option, index) => (
                    <SelectOption key={index} value={option.value} label={option.label} />
                  ))}
                </SelectComponent>

                <SelectComponent
                  label="Pengadaan Drilling Services"
                  name="wrm_pengadaan_drilling_services"
                  placeholder="Select Pengadaan Drilling Services"
                  value={values.wrm_pengadaan_drilling_services || ""}
                  onChange={handleSelectChange("wrm_pengadaan_drilling_services")}
                  align="Horizontal"
                  mt={4}
                >
                  {ValueOption.map((option, index) => (
                    <SelectOption key={index} value={option.value} label={option.label} />
                  ))}
                </SelectComponent>

                <SelectComponent
                  label="Pengadaan LLI"
                  name="wrm_pengadaan_lli"
                  placeholder="Select Pengadaan LLI"
                  value={values.wrm_pengadaan_lli || ""}
                  onChange={handleSelectChange("wrm_pengadaan_lli")}
                  align="Horizontal"
                  mt={4}
                >
                  {ValueOption.map((option, index) => (
                    <SelectOption key={index} value={option.value} label={option.label} />
                  ))}
                </SelectComponent>

                <SelectComponent
                  label="Persiapan Lokasi"
                  name="wrm_persiapan_lokasi"
                  placeholder="Select Persiapan Lokasi"
                  value={values.wrm_persiapan_lokasi || ""}
                  onChange={handleSelectChange("wrm_persiapan_lokasi")}
                  align="Horizontal"
                  mt={4}
                >
                  {ValueOption.map((option, index) => (
                    <SelectOption key={index} value={option.value} label={option.label} />
                  ))}
                </SelectComponent>

                <SelectComponent
                  label="Internal KKKS"
                  name="wrm_internal_kkks"
                  placeholder="Select Internal KKKS"
                  value={values.wrm_internal_kkks || ""}
                  onChange={handleSelectChange("wrm_internal_kkks")}
                  align="Horizontal"
                  mt={4}
                >
                  {ValueOption.map((option, index) => (
                    <SelectOption key={index} value={option.value} label={option.label} />
                  ))}
                </SelectComponent>

                <SelectComponent
                  label="Evaluasi Subsurface"
                  name="wrm_evaluasi_subsurface"
                  placeholder="Select Evaluasi Subsurface"
                  value={values.wrm_evaluasi_subsurface || ""}
                  onChange={handleSelectChange("wrm_evaluasi_subsurface")}
                  align="Horizontal"
                  mt={4}
                >
                  {ValueOption.map((option, index) => (
                    <SelectOption key={index} value={option.value} label={option.label} />
                  ))}
                </SelectComponent>
              </>
            )}

            <Button onClick={handleOpenSubmitDialog} colorScheme="green" mt={4}>
              Submit Updates
            </Button>
          </GridLayout.Item>
        </GridLayout>

        {/* AlertDialog untuk konfirmasi submit */}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirm Submit
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to submit these updates? This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="green" onClick={handleSubmit} ml={3}>
                  Submit
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </CardFormK3>
    </div>
  );
};

export default WRMUpdates;
