import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default async function PostWorkover(data) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/job/planning/create/workover`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data Table", error);
    return null;
  }
}

export async function PostWellService(data) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/job/planning/create/wellservice`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data Table", error);
    return null;
  }
}

export async function PostOperationReport(data) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/job/daily-operation-reports/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error get Data Table", error);
    return error
  }
}
