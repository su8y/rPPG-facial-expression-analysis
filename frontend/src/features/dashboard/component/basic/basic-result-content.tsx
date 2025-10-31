import {HeartRateSection} from "./heart-rate-section.tsx";
import type {DashboardData} from "../../types/rppg.type.ts";
import {HeartRateVariabilityChart} from "./heart-rate-variability-chart.tsx";
import {DepressionRingChart} from "./depression-ring-chart.tsx";
import {StressGaugeChart} from "./stress-gauge-chart.tsx";
import {SimpleGrid} from "@mantine/core";
import {EmotionDoughnutChart} from "./emotion-doughnut-chart.tsx";
import {useElementSize} from "@mantine/hooks";

export interface BasicResultsContentProps {
    data: DashboardData;
}

export const BasicResultContent = ({data}: BasicResultsContentProps) => {
    const {ref, width} = useElementSize();
    const stressGridCols = width < 550 ? 1 : 2;
    return (
        <SimpleGrid cols={1} spacing="lg">
            <HeartRateSection previousHrValues={data.previousRPPG.hrValues}
                              currentHrValues={data.currentRPPG.hrValues}/>
            <HeartRateVariabilityChart previousHrv={data.previousRPPG.hrv}
                                       currentHrv={data.currentRPPG.hrv}/>
            <SimpleGrid ref={ref} cols={stressGridCols}>
                <StressGaugeChart level={data.currentRPPG.stress}/>
                <EmotionDoughnutChart emotion={data.currentRPPG.emotion}
                                      emotionResult={data.currentRPPG.emotionResult}/>
            </SimpleGrid>
            <DepressionRingChart score={data.depressionScore.current}/>
        </SimpleGrid>
    );
};