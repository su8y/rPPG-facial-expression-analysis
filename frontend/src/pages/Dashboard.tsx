import {useDashboardData} from "../hooks/useDashboardData.ts";
import {QueryLayout} from "../components/QueryLayout.tsx";
import {BasicResults} from "../components/dashboard/BasicResults.tsx";
import {DetailedResults} from "../components/dashboard/DetailedResults.tsx";
import {Grid, Tabs} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";

export function Dashboard() {
    const dashboardQueryResult = useDashboardData();
    const isMobile = useMediaQuery('(max-width: 48em)'); // Mantine's default breakpoint for sm is 48em

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