import { useDashboardData } from "../hooks/useDashboardData.ts";
import { QueryLayout } from "../components/QueryLayout.tsx";

export function Dashboard() {
    const dashboardQueryResult = useDashboardData();

    return (
        <QueryLayout queryResult={dashboardQueryResult}>
            {
                (data) => <mark>{JSON.stringify(data)}success</mark>
            }
        </QueryLayout>
    );
}