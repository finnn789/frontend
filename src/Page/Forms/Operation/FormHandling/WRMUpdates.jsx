import React, { useState } from "react";
import CardFormK3 from "../../Components/CardFormK3";
import GridLayout from "../../Layout/GridLayout";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";
import { IconBrightness } from "@tabler/icons-react";
import { patchWRM, getWRMData } from "../../../../Page/API/APISKK"; // Memanggil kedua fungsi dari file lain
import { Input, Button } from "@chakra-ui/react"; // Pastikan Chakra UI digunakan untuk Input dan Button

const WRMUpdates = () => {
  const [actualExplorationId, setActualExplorationId] = useState(""); // State untuk actual_exploration_id
  const [values, setValues] = useState(null); // Inisialisasi dengan null agar lebih mudah dalam pengecekan
  const [loading, setLoading] = useState(false); // State untuk status loading

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
  

  // Fungsi untuk memulai pengambilan data WRM setelah actual_exploration_id dimasukkan
  const handleFetchData = async () => {
    if (!actualExplorationId) {
      console.error("actual_exploration_id is required");
      return;
    }

    setLoading(true); // Set status loading menjadi true
    try {
      const response = await getWRMData(actualExplorationId); // Memanggil fungsi getWRMData dari file lain
      if (response) {
        setValues(response); // Set data respons ke state
      } else {
        setValues(null); // Jika respons tidak valid, set values ke null
      }
    } catch (error) {
      console.error("Error fetching WRM data", error);
      setValues(null); // Set nilai default jika error
    } finally {
      setLoading(false); // Selesai loading, set menjadi false
    }
  };

  const handleSelectChange = (name) => (e) => {
    const newValue = e.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: newValue,
    }));
  };

  const handleSubmit = async () => {
    if (!actualExplorationId) {
      console.error("actual_exploration_id and exploration_id are required");
      return;
    }

    try {
      const response = await patchWRM(actualExplorationId, values); // Mengirim data state `values` ke patchWRM
      console.log("Data updated successfully", response);
    } catch (error) {
      console.error("Failed to update data", error);
    }
  };

  return (
    <div>
      <CardFormK3 title={"WRM Updates"} icon={IconBrightness} subtitle="WRM">
        <GridLayout Columns={1} Gap={2}>
          <GridLayout.Item>
            {/* Input untuk memasukkan actual_exploration_id */}
            <Input
              placeholder="Enter actual_exploration_id"
              value={actualExplorationId}
              onChange={(e) => setActualExplorationId(e.target.value)}
              mb={4} // Margin bottom untuk memberi ruang sebelum elemen lain
            />
            {/* Input untuk memasukkan exploration_id */}
            {/* Tombol untuk mengambil data */}
            <Button onClick={handleFetchData} colorScheme="blue" mb={4}>
              Fetch WRM Data
            </Button>

            {loading && <div>Loading...</div>}

            {values && !loading && (
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

            <Button onClick={handleSubmit} colorScheme="green" mt={4}>
              Submit Updates
            </Button>
          </GridLayout.Item>
        </GridLayout>
      </CardFormK3>
    </div>
  );
};

export default WRMUpdates;
