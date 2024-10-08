import axios from "axios";

export async function getDataDashboardSKK() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/home`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data?.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return null;
  }
}

// const response = await axios.post(
//   `${import.meta.env.VITE_APP_URL}/job/planning/create/development`,
//   data,
//   {
//     headers: {
//       "Content-Type": "application/json",

//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   }
// );
export async function getChartDashboardSKK() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/job-summary-chart`
    );

    return response.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return null;
  }
}
export async function getKKSJobdata() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/home`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return response.data.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return null;
  }
}
export async function getBarChartDataSKK() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/job-summary-chart`
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return null;
  }
}

export async function getJobDasboard(job_type) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/job/${job_type}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);

    return response.data.data;
  } catch (error) {
    console.error("Error get Data Table", error);
    return null;
  }
}

export async function getJobInfo(job_type) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/view-job/${job_type}/`
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error get Job Info", error);
    return null;
  }
}

export async function getKKKSInfo(job_type) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/view-job/${job_type}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data.data);

    return response.data;
  } catch (error) {
    console.error("Error get Data Table", error);
    return null;
  }
}

export async function getJobTypeSummarySKK() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/job-type-summary-skk`
    );
    console.log("summary data:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return null;
  }
}

export async function getDataJobCountPlanningEx() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/job-counts/planning`
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return null;
  }
}

export async function getRigTypePieChart() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/rig-type-pie-chart`
    );
    console.log("rig type pie chart", response.data);

    return response.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return null;
  }
}

export async function getBudgetSummaryCharts() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/budget-summary-charts`
    );
    console.log("budget summary bar chart", response.data);

    return response.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return null;
  }
}

export async function getJobWellStatusChart() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/job-well-status-summary`
    );
    console.log("job well status chart", response.data);

    return response.data;
  } catch (error) {
    console.error("Error get Data Well", error);
    return null;
  }
}

export async function getJobPhase(job_type, job_phase) {
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
    console.error("Error get Data Well And Start Date", error);
    return null;
  }
}

export async function getCombinedData() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/combined-data`
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data Well And Start Date", error);
    return null;
  }
}
export async function getDataOperation() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/data-operations`
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data Well And Start Date", error);
    return null;
  }
}
export async function getDataPPP() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/data-p3`
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data Well And Start Date", error);
    return null;
  }
}

export async function getDataTypeSummarySKK() {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/dashboard/job-type-summary-skk`
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data Well And Start Date", error);
    return null;
  }
}

export async function PostPlanningExploration(data) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/job/planning/create/exploration`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // console.log("response.status", response);

    return response;
  } catch (error) {
    console.error("Error Dalam Kirim Data", error);

    // Jika error berasal dari response API (misalnya error 400 atau 500)
    if (error.response) {
      console.error("Response Error Data:", error.response.data);
      throw error.response; // Mengembalikan data error dari server
    } else if (error.request) {
      console.error("No Response:", error.request);
      throw { message: "No response from server." };
    } else {
      console.error("Request Error:", error.message);
      throw { message: error.message };
     
    }

    
  }
}

//   API UNTUK PLANNING DEVELOPMENT

export async function PostPlanningDevelopment(data, toast) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_URL}/job/planning/create/development`,
      data,
      {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  } catch (error) {
    console.error("Error Dalam Kirim Data", error);

    toast({
      title: "Terjadi kesalahan.",
      description: "Data gagal dikirim ke server.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
}

export async function GetViewPlanning(data) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/job/planning/view/${data}`,
      {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data View Planning", error);
    return null;
  }
}

export async function GetImageWellCasing(path) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      responseType: "blob", // Tambahkan ini untuk mendapatkan response sebagai blob
    });
    return response.data; // Mengembalikan blob dari gambar
  } catch (error) {
    console.error("Error get Data View Planning", error);
    return null;
  }
}

export async function GetDataWell(data) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_URL}${data}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      responseType: "blob", // Tambahkan ini untuk mendapatkan response sebagai blob
    });
    return response.data; // Mengembalikan blob dari gambar
  } catch (error) {
    console.error("Error Get Data Well", error);
    return error;
  }
}


export async function patchWRM(actual_exploration_id, formData) {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_APP_URL}/job/operation/update/wrm/${actual_exploration_id}?exploration_id=${actual_exploration_id}`,
      formData, // Mengirim formData dalam body
      {
        headers: {
          "Content-Type": "application/json", // Pastikan menggunakan JSON
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating WRM data", error);
    throw error;
  }
}


export async function getWRMData(job_id, model_type) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/job/operation/update/wrm/${job_id}?model_type=${model_type}`,
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data getWRMData", error);
    return null;
  }
}

export async function GetDataStratigraphy(area_id) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_URL}/spatial/api/strat-units/${area_id}`,
      {
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error get Data View Planning", error);
    return null;
  }
}