import React from 'react';
import {Box, Center, Group, Stack, Text} from '@mantine/core';
import {LineChart} from "@mantine/charts";
import {DetailSection} from "../detail/DetailSection.tsx";
import {HeartRateChangesChart} from "./HeartRateChagesChart.tsx";

interface HeartRateChartProps {
    previousHrValues: number[];
    currentHrValues: number[];
}

export const HeartRateChart: React.FC<HeartRateChartProps> = ({
                                                                  previousHrValues,
                                                                  currentHrValues,
                                                              }) => {
    const data = previousHrValues.map((prev, index) => ({
        index: index + 1,
        '이전': prev,
        '현재': currentHrValues[index] || null, // Handle cases where lengths might differ
    }));
    const currentAverageHrValue = Math.round(currentHrValues.reduce((a, b) => a + b, 0) / currentHrValues.length);
    return (
        <DetailSection title={'심박수'}>
            <Stack>
                <Box style={{position: 'relative'}}>

                    <LineChart
                        h={'15rem'}
                        data={data}
                        dataKey="index"
                        curveType="monotone"
                        xAxisLabel="시간 (초)"
                        yAxisLabel="심박수 (bpm)"
                        withTooltip
                        withLegend
                        style={{userSelect: 'none', cursor: 'pointer'}}
                        series={[
                            {name: '이전', color: 'indigo.6'},
                            {name: '현재', color: 'teal.6'},
                        ]}
                    />
                    <Center style={{
                        position: 'absolute',
                        bottom: '25%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        userSelect: 'none',
                    }}>
                        <Stack gap={0}>
                            <Text size={'1rem'} fw={500}>평균</Text>
                            <Group gap={1}>
                                <Text component={'span'} size="1.5em" fw={700} lh={1}>
                                    {currentAverageHrValue}
                                </Text>
                                <Text component={'span'} size="1rem" fw={500}>
                                    BPM
                                </Text>
                            </Group>
                        </Stack>
                    </Center>
                </Box>
                <Center>
                    <Text size={'xs'} style={{whiteSpace: 'pre-line'}}>
                        {`심박수는 1분동안 심장이 뛰는 횟수를 의미해요.
                        일반적으로 성인은 60~100 BPM이 정상 범위에요.
                        심박수가 너무 높거나 낮으면
                        건강 문제의 신호일 수 있어 주의가 필요해요.`}
                    </Text>
                </Center>
                <HeartRateChangesChart previousHrValues={previousHrValues} currentHrValues={currentHrValues}/>
            </Stack>
        </DetailSection>
    );
};