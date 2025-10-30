import {HeartRateChart} from "./basic/HeartRateChart.tsx";
import type {DashboardData} from "../types/rppg.type.ts";
import {HeartRateVariabilityChart} from "./basic/HeartRateVariabilityChart.tsx";
import {DepressionResultChart} from "./basic/DepressionResultChart.tsx";
import {StressGauge} from "./basic/StressGauge.tsx";
import {Grid} from "@mantine/core";
import {EmotionDoughnutChart} from "./basic/EmotionDoughnutChart.tsx";
import {HeartRateChangesChart} from "./basic/HeartRateChagesChart.tsx";

export interface BasicResultsProps {
    data: DashboardData;
}

export const BasicResults = ({data}: BasicResultsProps) => {
    return (
        <div>
            <HeartRateChart previousHrValues={data.previousRPPG.hrValues}
                            currentHrValues={data.currentRPPG.hrValues}/>
            <HeartRateChangesChart previousHrValues={data.previousRPPG.hrValues}
                                   currentHrValues={data.currentRPPG.hrValues}/>
            <HeartRateVariabilityChart previousHrv={data.previousRPPG.hrv}
                                       currentHrv={data.currentRPPG.hrv}/>
            <Grid>
                <StressGauge level={data.currentRPPG.stress}/>
                <EmotionDoughnutChart emotion={data.currentRPPG.emotion}
                                      emotionResult={data.currentRPPG.emotionResult}/>
            </Grid>
            <DepressionResultChart score={data.depressionScore.current}/>
        </div>
    );
};