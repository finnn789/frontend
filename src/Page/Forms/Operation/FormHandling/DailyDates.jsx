import React, { useState } from "react";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

import SimpleButton from "../../Components/SimpleButton";
import FormControlCard from "../../Components/FormControl";
import CardFormK3 from "../../Components/CardFormK3";
import { GetDateJobInstances } from "../../../API/APIKKKS";
import { useLocation } from "react-router-dom";
import { dates } from "./Dates";

const DailyDates = ({ handleChangeOfData, messageError }) => {
  let location = useLocation();

  const messageErrors = messageError;
  // console.log(messageErrors);
  const { job_plan_ld } = location.state;
  const date = dates();

  // console.log(date);

  const [dateNow, setDateNow] = useState("");

  const [dateDataJobPlan, setDateDataJobPlan] = useState([]);

  const [dataSetData, setDataSetData] = useState({
    report_date: date,
    avg_wob: null,
    avg_rop: null,
    avg_rpm: null,
    torque: null,
    stand_pipe_pressure: null,
    flow_rate: null,
    string_weight: null,
    rotating_weight: null,
    total_drilling_time: null,
    circulating_pressure: null,
    daily_cost: null,
    daily_mud_cost: null,
    day_supervisor: null,
    night_supervisor: null,
    engineer: null,
    geologist: null,
  });
  // console.log(dataSetData);

  React.useEffect(() => {
    GetDateJobInstances(job_plan_ld).then(
      (res) => {
        setDateDataJobPlan(res.data);
        // console.log(res.data);
      },
      [setDateDataJobPlan]
    );
  }, [job_plan_ld]);

  React.useEffect(() => {
    setDataSetData((prevData) => ({
      ...prevData,
      report_date: dateNow,
    }));
  }, [dateNow]);

  React.useEffect(() => {
    handleChangeOfData(dataSetData);
  }, [dataSetData]);

  const handleChange = React.useCallback(
    (name, type) => (e) => {
      let value = e.target.value;
      if (type === "number") {
        value = value.includes(".") ? parseFloat(value) : parseInt(value, 10);
      } else {
        value = String(value);
      }

      setDataSetData((prevData) => ({ ...prevData, [name]: value }));
    },
    [setDataSetData]
  );
  // console.log("dateDataJobPlan:", dateDataJobPlan)
  //   x
  return (
    <>
      <SimpleGrid width={"100%"} columns={10} spacing={2}>
        {dateDataJobPlan.map((date, index) => (
          <Box key={index}>
            <SimpleButton
              isActive={date.date === dateNow}
              onClick={() => setDateNow(date.date)}
              colorScheme={date?.color}
              key={index}
              title={date.date}
            />
          </Box>
        ))}
      </SimpleGrid>

      <Flex mt={2}>
        <FormControlCard
          labelForm="Dates"
          type={"text"}
          value={dateNow}
          placeholder="Dates"
          isDisabled
          isInvalid={!!messageErrors?.report_date}
          errorMessage={messageErrors?.report_date}
          
        />
      </Flex>

      <SimpleGrid columns={3} spacing={4}>
        <CardFormK3 title="" subtitle="" padding="6px 12px" icon="">
          <FormControlCard
            labelForm="Avg WOB"
            isInvalid={!!messageErrors?.avg_wob}
            errorMessage={messageErrors?.avg_wob}
            placeholder="Avg WOB"
            type={"number"}
            value={dataSetData.avg_wob}
            handleChange={handleChange("avg_wob", "number")}
          />
          <FormControlCard
            labelForm="Avg ROP"
            isInvalid={!!messageErrors?.avg_rop}
            errorMessage={messageErrors?.avg_rop}
            type={"number"}
            placeholder="Avg ROP"
            handleChange={handleChange("avg_rop", "number")}
          />
          <FormControlCard
            labelForm="Avg RPM"
            isInvalid={!!messageErrors?.avg_rpm}
            errorMessage={messageErrors?.avg_rpm}
            type={"number"}
            placeholder="Avg RPM"
            handleChange={handleChange("avg_rpm", "number")}
          />
          <FormControlCard
            labelForm="Torque"
            isInvalid={!!messageErrors?.torque}
            errorMessage={messageErrors?.torque}
            type={"number"}
            placeholder="Torque"
            handleChange={handleChange("torque", "number")}
          />
          <FormControlCard
            labelForm="Stand Pipe Press"
            isInvalid={!!messageErrors?.stand_pipe_pressure}
            errorMessage={messageErrors?.stand_pipe_pressure}
            type={"number"}
            placeholder="Stand Pipe Press"
            handleChange={handleChange("stand_pipe_pressure", "number")}
          />
          <FormControlCard
            labelForm="Flow Rate"
            isInvalid={!!messageErrors?.flow_rate}
            errorMessage={messageErrors?.flow_rate}
            type={"number"}
            placeholder="Flow Rate"
            handleChange={handleChange("flow_rate", "number")}
          />
          <FormControlCard
            labelForm="String Weight"
            isInvalid={!!messageErrors?.string_weight}
            errorMessage={messageErrors?.string_weight}
            type={"number"}
            placeholder="String Weight"
            handleChange={handleChange("string_weight", "number")}
          />
          <FormControlCard
            labelForm="Rotating Weight"
            isInvalid={!!messageErrors?.rotating_weight}
            errorMessage={messageErrors?.rotating_weight}
            type={"number"}
            placeholder="Rotating Weight"
            handleChange={handleChange("rotating_weight", "number")}
          />
          <FormControlCard
            labelForm="Total Drilling Time"
            isInvalid={!!messageErrors?.total_drilling_time}
            errorMessage={messageErrors?.total_drilling_time}
            type={"number"}
            placeholder="Total Drilling Time"
            handleChange={handleChange("total_drilling_time", "number")}
          />
          <FormControlCard
            labelForm="Circulating Press"
            isInvalid={!!messageErrors?.circulating_pressure}
            errorMessage={messageErrors?.circulating_pressure}
            type={"number"}
            placeholder="Circulating Press"
            handleChange={handleChange("circulating_pressure", "number")}
          />
        </CardFormK3>

        <CardFormK3 title="" padding="6px 12px" subtitle="" icon="">
          <FormControlCard
            labelForm="Rig Type / Name"
            isInvalid={!!messageErrors?.rig_type}
            errorMessage={messageErrors?.rig_type}
            type={"text"}
            placeholder="Rig Type / Name"
            handleChange={handleChange("rig_type", "text")}
          />
          <FormControlCard
            labelForm="Rig Power"
            isInvalid={!!messageErrors?.rig_power}
            errorMessage={messageErrors?.rig_power}
            type={"number"}
            placeholder="Rig Power"
            inputRightOn={"Horse Power "}
            handleChange={handleChange("rig_power", "number")}
          />
          <FormControlCard
            labelForm="KB Elev"
            isInvalid={!!messageErrors?.kb_elev}
            errorMessage={messageErrors?.kb_elev}
            type={"number"}
            placeholder="KB Elev"
            handleChange={handleChange("kb_elev", "number")}
          />
          <FormControlCard
            labelForm="Current MD"
            isInvalid={!!messageErrors?.current_md}
            errorMessage={messageErrors?.current_md}
            type={"number"}
            placeholder="Current MD"
            handleChange={handleChange("current_md", "number")}
          />
          <FormControlCard
            labelForm="Progress MD"
            isInvalid={!!messageErrors?.progress_md}
            errorMessage={messageErrors?.progress_md}
            type={"number"}
            placeholder="Progress MD"
            handleChange={handleChange("progress_md", "number")}
          />
        </CardFormK3>

        <CardFormK3 title="" padding="6px 12px" subtitle="" icon="">
          <FormControlCard
            labelForm="AFE Number"
            isInvalid={!!messageErrors?.afe_number}
            errorMessage={messageErrors?.afe_number}
            type={"number"}
            placeholder="AFE Number"
            handleChange={handleChange("afe_number", "number")}
          />
          <FormControlCard
            labelForm="AFE Cost"
            isInvalid={!!messageErrors?.afe_cost}
            errorMessage={messageErrors?.afe_cost}
            type={"number"}
            placeholder="AFE Cost"
            handleChange={handleChange("afe_cost", "number")}
          />
          <FormControlCard
            labelForm="Daily Cost"
            isInvalid={!!messageErrors?.daily_cost}
            errorMessage={messageErrors?.daily_cost}
            type={"number"}
            handleChange={handleChange("daily_cost", "number")}
          />
          <FormControlCard
            labelForm="Cumulative Cost"
            isInvalid={!!messageErrors?.cumulative_cost}
            errorMessage={messageErrors?.cumulative_cost}
            type={"number"}
            handleChange={handleChange("cumulative_cost", "number")}
          />
          <FormControlCard
            labelForm="Daily Mud Cost"
            isInvalid={!!messageErrors?.daily_mud_cost}
            errorMessage={messageErrors?.daily_mud_cost}
            type={"number"}
            handleChange={handleChange("daily_mud_cost", "number")}
          />
          <FormControlCard
            labelForm="Cumulative Mud Cost"
            isInvalid={!!messageErrors?.cumulative_mud_cost}
            errorMessage={messageErrors?.cumulative_mud_cost}
            type={"number"}
            handleChange={handleChange("cumulative_mud_cost", "number")}
          />
          <FormControlCard
            labelForm="Day Supervisor"
            isInvalid={!!messageErrors?.day_supervisor}
            errorMessage={messageErrors?.day_supervisor}
            type={"number"}
            handleChange={handleChange("day_supervisor", "number")}
          />
          <FormControlCard
            labelForm="Night Supervisor"
            isInvalid={!!messageErrors?.night_supervisor}
            errorMessage={messageErrors?.night_supervisor}
            type={"number"}
            handleChange={handleChange("night_supervisor", "number")}
          />
          <FormControlCard
            labelForm="Engineer"
            isInvalid={!!messageErrors?.engineer}
            errorMessage={messageErrors?.engineer}
            type={"number"}
            handleChange={handleChange("engineer", "number")}
          />
          <FormControlCard
            labelForm="Geologist"
            isInvalid={!!messageErrors?.geologist}
            errorMessage={messageErrors?.geologist}
            type={"number"}
            handleChange={handleChange("geologist", "number")}
          />
        </CardFormK3>
      </SimpleGrid>

      <CardFormK3 title="" subtitle="" icon={""} padding=" 0px 12px 20px 12px">
        <FormControlCard
          labelForm="Day Summary"
          isInvalid={!!messageErrors?.day_summary}
          errorMessage={messageErrors?.day_summary}
          type={"text"}
          handleChange={handleChange("day_summary", "text")}
          isTextArea
        />
        <FormControlCard
          labelForm="Day Forecast"
          isInvalid={!!messageErrors?.day_forecast}
          errorMessage={messageErrors?.day_forecast}
          type={"text"}
          handleChange={handleChange("day_forecast", "text")}
          isTextArea
        />
      </CardFormK3>
    </>
  );
};

export default DailyDates;
