import axios from "axios";
import { useToast } from "@chakra-ui/react";

export async function PostWorkover(data) {
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
      `${import.meta.env.VITE_APP_URL}/job/daily-operations-reports/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error get Data Table", error);
    throw error;
  }
}

// ANCHOR POST WRM ISSUES
export async function createJobIssue(data, toast) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/job/create-job-issues/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response.status", response);

    if (response.status === 200) {
      toast({
        title: "Data berhasil dikirim.",
        description: "Data telah berhasil disimpan ke database.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }

    return response.data;
  } catch (error) {
    console.error("Error creating job issue", error);
    toast({
      title: "Error",
      description: "Terjadi kesalahan saat menyimpan data.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
}
// ANCHOR PATCH WRM ISSUES
export const updateJobIssue = async (issueId, data) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_URL}/job/job-issues/${issueId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating job issue", error);
  }
};

// ANCHOR PATCH STATUS OPERATION TO OPERATE

export const patchStatusOperationToOperate = async (jod_id) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_URL}/job/operations/operate/${jod_id}`,
      [],
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating job issue", error);
    console.log("token", localStorage.getItem("token"));
  }
};

export const putPlanningUpdate = async (job_id, data) => {
  console.log("easdawdasd job_id : ", job_id);
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_URL}/job/planning/update/${job_id}`,
      data,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating job issue", error);
  }
};

export const UploadFileBatch = async (file, job_type) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/job/planning/upload-batch/${job_type}`,
      file,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ) 
    return response.data;
  } catch (error) {
    console.error(error)
    throw error
  }
};

export const DeleteJobPlanning = async (job_id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_URL}/job/planning/delete/${job_id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw error
  }
};

