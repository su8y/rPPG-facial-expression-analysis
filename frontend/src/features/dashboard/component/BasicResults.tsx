import React from 'react';
import {HeartRateChart} from "./basic/HeartRateChart.tsx";
import type {DashboardData} from "../types/rppg.type.ts";
import {HeartRateVariabilityChart} from "./basic/HeartRateVariabilityChart.tsx";
import {DepressionResultChart} from "./basic/DepressionResultChart.tsx";
import {StressGauge} from "./basic/StressGauge.tsx";
import {Grid} from "@mantine/core";
import {EmotionDoughnutChart} from "./basic/EmotionDoughnutChart.tsx";

export interface BasicResultsProps {
    data: DashboardData;
}

export const BasicResults: React.FC<BasicResultsProps> = ({data}) => {
    return (
        <div>
            <HeartRateChart previousHrValues={data.previousRPPG.hrValues}
                            currentHrValues={data.currentRPPG.hrValues}></HeartRateChart>
            <HeartRateVariabilityChart previousHrValues={data.previousRPPG.hrValues}
                                       currentHrValues={data.currentRPPG.hrValues}></HeartRateVariabilityChart>
            <Grid>
                <StressGauge level={data.currentRPPG.stress}></StressGauge>
                <EmotionDoughnutChart emotion={data.currentRPPG.emotion}
                                      emotionResult={data.currentRPPG.emotionResult}/>
            </Grid>
            <DepressionResultChart score={data.depressionScore.current}></DepressionResultChart>
        </div>
    );
};