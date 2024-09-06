import axios from "axios";


export async function getDataDashboardSKK() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/home`)
        return response.data

    } catch (error) {
        console.error("Error get Data Well", error);
        return null
    }
}
export async function getChartDashboardSKK() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/job-summary-chart`)
        
        
        return response.data

    } catch (error) {
        console.error("Error get Data Well", error);
        return null
    }
}
export async function getKKSJobdata() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/kkks-job-data`)
        
        
        return response.data

    } catch (error) {
        console.error("Error get Data Well", error);
        return null
    }
}
export async function getBarChartDataSKK() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/job-summary-chart`)
        console.log(response.data);
        
        return response.data

    } catch (error) {
        console.error("Error get Data Well", error);
        return null
    }
}

export async function getJobDasboard(job_type) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/job/${job_type}`)
        console.log(response.data);
        
        return response.data

    } catch (error) {
        console.error("Error get Data Table", error);
        return null
    }
}

export async function getKKKSInfo(kkks_id) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/kkks/${kkks_id}/job-data`)
        console.log(response.data);
        
        return response.data

    } catch (error) {
        console.error("Error get Data Table", error);
        return null
    }
}

export async function getJobTypeSummarySKK() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/job-type-summary-skk`)
        console.log('summary data:',response.data);
        
        return response.data

    } catch (error) {
        console.error("Error get Data Well", error);
        return null
    }
}

export async function getDataJobCountPlanningEx() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/job-counts/planning`)
        console.log(response.data);
        
        return response.data

    } catch (error) {
        console.error("Error get Data Well", error);
        return null
    }
}

export async function getRigTypePieChart() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/rig-type-pie-chart`)
        console.log('rig type pie chart',response.data);
        
        return response.data

    } catch (error) {
        console.error("Error get Data Well", error);
        return null
    }
}

export async function getBudgetSummaryCharts() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/budget-summary-charts`)
        console.log('budget summary bar chart',response.data);
        
        return response.data

    } catch (error) {
        console.error("Error get Data Well", error);
        return null
    }
}

export async function getJobWellStatusChart() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/job-well-status-summary`)
        console.log('job well status chart',response.data);
        
        return response.data

    } catch (error) {
        console.error("Error get Data Well", error);
        return null
    }
}

export async function getCombinedData() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/combined-data`)
        return response.data

    } catch (error) {
        console.error("Error get Data Well And Start Date", error);
        return null
    }
}
export async function getDataOperation() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/data-operations`)
        return response.data

    } catch (error) {
        console.error("Error get Data Well And Start Date", error);
        return null
    }
}
export async function getDataPPP() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/data-p3`)
        return response.data

    } catch (error) {
        console.error("Error get Data Well And Start Date", error);
        return null
    }
}

export async function getDataTypeSummarySKK() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/job-type-summary-skk`)
        return response.data

    } catch (error) {
        console.error("Error get Data Well And Start Date", error);
        return null
    }
}
// export async function getCombineDataExploration() {