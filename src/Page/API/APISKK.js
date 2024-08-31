import axios from "axios";


export async function getDataDashboardSKK() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/aggregate-job-data`)
        
        
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
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/budget-summary-charts`)
        console.log(response.data);
        
        return response.data

    } catch (error) {
        console.error("Error get Data Well", error);
        return null
    }
}

export async function getTableRealization() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/exploration/realization`)
        console.log(response.data);
        
        return response.data

    } catch (error) {
        console.error("Error get Data Table", error);
        return null
    }
}

export async function getKKKSInfo(kkks_id) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}/dashboard/kkks/${kkks_id}/detail`)
        console.log(response.data);
        
        return response.data

    } catch (error) {
        console.error("Error get Data Table", error);
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
