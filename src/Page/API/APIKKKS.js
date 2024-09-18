import axios from "axios";

export async function getTableKKKS(job_type, job_phase) {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_URL
      }/dashboard/job-phase/${job_type}/${job_phase}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return response.data;
  }
}

export async function getAreaID() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/spatial/api/areas`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return response.data;
  }
}

export async function GetFieldID() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/spatial/api/lapangan`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return response.data;
  }
}
