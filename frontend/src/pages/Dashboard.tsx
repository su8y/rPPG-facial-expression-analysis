import {useDashboardData} from "../features/dashboard/hooks/useDashboardData.ts";
import {Grid, Tabs} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {BasicResults, DetailedResults} from "../features/dashboard";
import {QueryLayout} from "../components";

export function Dashboard() {
    const dashboardQueryResult = useDashboardData();
    const isMobile = useMediaQuery('(max-width: 73em)');

    return (
        <QueryLayout queryResult={dashboardQueryResult}>
            {
                (data) => (
                    isMobile ? (
                        <Tabs defaultValue="basic">
                            <Tabs.List>
                                <Tabs.Tab value="basic">기본 결과</Tabs.Tab>
                                <Tabs.Tab value="detailed">상세 결과</Tabs.Tab>
                            </Tabs.List>

                            <Tabs.Panel value="basic">
                                <BasicResults data={data}/>
                            </Tabs.Panel>
                            <Tabs.Panel value="detailed">
                                <DetailedResults data={data}/>
                            </Tabs.Panel>
                        </Tabs>
                    ) : (
                        <Grid>
                            <Grid.Col span={6}>
                                <BasicResults data={data}/>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <DetailedResults data={data}/>
                            </Grid.Col>
                        </Grid>
                    )
                )
            }
        </QueryLayout>
    );
}