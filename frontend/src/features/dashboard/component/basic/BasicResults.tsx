import {HeartRateChart} from "./HeartRateChart.tsx";
import type {DashboardData} from "../../types/rppg.type.ts";
import {HeartRateVariabilityChart} from "./HeartRateVariabilityChart.tsx";
import {DepressionResultChart} from "./DepressionResultChart.tsx";
import {StressGauge} from "./StressGauge.tsx";
import {Grid} from "@mantine/core";
import {EmotionDoughnutChart} from "./EmotionDoughnutChart.tsx";
import {HeartRateChangesChart} from "./HeartRateChagesChart.tsx";

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