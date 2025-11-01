import type {DashboardData} from "../types/rppg.type.ts";
import axiosInstance from "../../../utils/axios.ts";

export const getDashboardData = async (): Promise<DashboardData> => {
    const dashboardUrl = import.meta.env.VITE_DASHBOARD_API as string;
    const response = await axiosInstance.get(dashboardUrl);
    const data = response.data as DashboardData
    if (data) {
        data.detailed.empathy.emotionRows.forEach(rows => {
            rows.aiAnalysis.percentage = Math.round(rows.aiAnalysis.percentage * 100)
        })
        data.detailed.replication.replicationRows.forEach(rows => {
            rows.aiAnalysis.previous = Math.round(rows.aiAnalysis.previous * 100)
            rows.aiAnalysis.current = Math.round(rows.aiAnalysis.current * 100)
        })

    }
    return response.data;
};
