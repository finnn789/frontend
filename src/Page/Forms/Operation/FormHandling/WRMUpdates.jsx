import React from "react";
import CardFormK3 from "../../Components/CardFormK3";
import GridLayout from "../../Layout/GridLayout";
import { SelectComponent, SelectOption } from "../../Components/SelectOption";
import { IconBrightness } from "@tabler/icons-react";
import FormControlCard from "../../Components/FormControl";

const WRMUpdates = () => {
  const ValueOption = [
    {
      value: 100,
      label: "100%",
    },
    {
      value: 75,
      label: "75%",
    },
    {
      value: 50,
      label: "50%",
    },
    {
      value: 25,
      label: "25%",
    },
    {
      value: 0,
      label: "0%",
    },
  ];

  
  return (
    <div>
      <CardFormK3 title={"WRM Updates"} icon={IconBrightness} subtitle="WRM">
        <GridLayout Columns={1} Gap={2}>
          <GridLayout.Item>
            <SelectComponent
              label="Pembebasan Lahan"
              name="pembebasan_lahan"
              placeholder="Select Pembebasan Lahan"
              align="Horizontal" // Change to "Vertical" for vertical layout
            >
              {ValueOption.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </SelectComponent>
            <SelectComponent
              label="Izin PPKH"
              name="Izin PPKH"
              placeholder="Select Izin PPKH"
              align="Horizontal"
              mt={4} // Change to "Vertical" for vertical layout
            >
              {ValueOption.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </SelectComponent>
            <SelectComponent
              label="UKL & UPL"
              name="uklUpl"
            //   value={formValues.uklUpl}
            //   onChange={handleSelectChange("uklUpl")}
              placeholder="Select UKL & UPL"
              align="Horizontal"
              mt={4}
            >
              {ValueOption.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </SelectComponent>

            <SelectComponent
              label="AMDAL"
              name="amdal"
            //   value={formValues.amdal}
            //   onChange={handleSelectChange("amdal")}
              placeholder="Select AMDAL"
              align="Horizontal"
              mt={4}
            >
              {ValueOption.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </SelectComponent>

            <SelectComponent
              label="Pengadaan Rig"
              name="pengadaanRig"
            //   value={formValues.pengadaanRig}
            //   onChange={handleSelectChange("pengadaanRig")}
              placeholder="Select Pengadaan Rig"
              align="Horizontal"
              mt={4}
            >
              {ValueOption.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </SelectComponent>

            <SelectComponent
              label="Pengadaan Drilling Services"
              name="pengadaanDrilling"
            //   value={formValues.pengadaanDrilling}
            //   onChange={handleSelectChange("pengadaanDrilling")}
              placeholder="Select Pengadaan Drilling Services"
              align="Horizontal"
              mt={4}
            >
              {ValueOption.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </SelectComponent>

            <SelectComponent
              label="Pengadaan LLI"
              name="pengadaanLLI"
            //   value={formValues.pengadaanLLI}
            //   onChange={handleSelectChange("pengadaanLLI")}
              placeholder="Select Pengadaan LLI"
              align="Horizontal"
              mt={4}
            >
              {ValueOption.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </SelectComponent>

            <SelectComponent
              label="Persiapan Lokasi"
              name="persiapanLokasi"
            //   value={formValues.persiapanLokasi}
            //   onChange={handleSelectChange("persiapanLokasi")}
              placeholder="Select Persiapan Lokasi"
              align="Horizontal"
              mt={4}
            >
              {ValueOption.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </SelectComponent>

            <SelectComponent
              label="Internal KKKS"
              name="internalKKKS"
            //   value={formValues.internalKKKS}
            //   onChange={handleSelectChange("internalKKKS")}
              placeholder="Select Internal KKKS"
              align="Horizontal"
              mt={4}
            >
              {ValueOption.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </SelectComponent>

            <SelectComponent
              label="Evaluasi Subsurface"
              name="evaluasiSubsurface"
            //   value={formValues.evaluasiSubsurface}
            //   onChange={handleSelectChange("evaluasiSubsurface")}
              placeholder="Select Evaluasi Subsurface"
              align="Horizontal"
              mt={4}
            >
              {ValueOption.map((option, index) => (
                <SelectOption
                  key={index}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </SelectComponent>
          </GridLayout.Item>
        </GridLayout>
      </CardFormK3>
    </div>
  );
};

export default WRMUpdates;
