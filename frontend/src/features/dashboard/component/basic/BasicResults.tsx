import {HeartRateChart} from "./HeartRateChart.tsx";
import type {DashboardData} from "../../types/rppg.type.ts";
import {HeartRateVariabilityChart} from "./HeartRateVariabilityChart.tsx";
import {DepressionResultChart} from "./DepressionResultChart.tsx";
import {StressGauge} from "./StressGauge.tsx";
import {SimpleGrid} from "@mantine/core";
import {EmotionDoughnutChart} from "./EmotionDoughnutChart.tsx";
import {useElementSize} from "@mantine/hooks";

export interface BasicResultsProps {
    data: DashboardData;
}

export const BasicResults = ({data}: BasicResultsProps) => {
    const {ref, width} = useElementSize();
    const stressGridCols = width < 550 ? 1 : 2;
    return (
        <SimpleGrid cols={1} spacing="lg">
            <HeartRateChart previousHrValues={data.previousRPPG.hrValues}
                            currentHrValues={data.currentRPPG.hrValues}/>
            <HeartRateVariabilityChart previousHrv={data.previousRPPG.hrv}
                                       currentHrv={data.currentRPPG.hrv}/>
            <SimpleGrid ref={ref} cols={stressGridCols}>
                <StressGauge level={data.currentRPPG.stress}/>
                <EmotionDoughnutChart emotion={data.currentRPPG.emotion}
                                      emotionResult={data.currentRPPG.emotionResult}/>
            </SimpleGrid>
            <DepressionResultChart score={data.depressionScore.current}/>
        </SimpleGrid>
    );
};