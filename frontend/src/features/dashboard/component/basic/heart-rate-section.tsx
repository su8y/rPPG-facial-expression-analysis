import React from 'react';
import {Center, Stack, Text} from '@mantine/core';
import {BorderCard} from "../border-card.tsx";
import {HeartRateChangesChart} from "./heart-rate-changes-chart.tsx";
import {HeartRateChart} from "./heart-rate-chart.tsx";


export const HeartRateSection = (props: HeartRateChartProps) => {
    return (
        <BorderCard title={'심박수'}>
            <Stack>
                <HeartRateChart {...props} />
                <Center>
                    <Text size={'xs'} style={{whiteSpace: 'pre-line'}}>
                        {`심박수는 1분동안 심장이 뛰는 횟수를 의미해요.
                        일반적으로 성인은 60~100 BPM이 정상 범위에요.
                        심박수가 너무 높거나 낮으면
                        건강 문제의 신호일 수 있어 주의가 필요해요.`}
                    </Text>
                </Center>
                <HeartRateChangesChart {...props}/>
            </Stack>
        </BorderCard>
    );
};