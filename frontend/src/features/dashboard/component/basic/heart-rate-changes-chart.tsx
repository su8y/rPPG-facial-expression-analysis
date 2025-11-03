import {Box, Card, Center, Group, type MantineColor, SimpleGrid, Stack, Text, ThemeIcon,} from '@mantine/core';
import {ScatterChart as ReScatterChart} from "@mantine/charts"
import {BorderCard} from "../border-card.tsx";


const LegendItem = ({label, color = 'dark'}: { label: string, color?: MantineColor }) => (
    <Group gap="sm" >
        <ThemeIcon color={color} size={10} radius="xl"/>
        <Text size="xs">{label}</Text>
    </Group>
);

const VerticalLine = () => (
    <Box w={2} h={30} bg="dark" style={{alignSelf: 'flex-start', marginLeft: 4}}/>
);


interface HeartRateCardProps {
    previousHrValues: number[];
    currentHrValues: number[];
}

function getMinAvgMax(arr: number[]) {
    let min = 9999999;
    let max = -9999999;
    let total = 0;
    arr.forEach(value => {
        if (value < min) {
            min = value;
        }
        if (value > max) {
            max = value;
        }
        total += value;
    })

    return {
            color: 'blue.5',
            name: 'Group 1',
            data: [
                {age: 0, value: min},
                {age: 0, value: Math.round(total / arr.length)},
                {age: 0, value: max}
            ],
        };


}

export const HeartRateChangesChart = ({previousHrValues, currentHrValues}: HeartRateCardProps) => {
    const prevData = getMinAvgMax(previousHrValues);
    const currentData = getMinAvgMax(currentHrValues);

    let min = 0;
    let max = 200;
    if(prevData.data[0].value && currentData.data[0].value) {
        min = Math.min(prevData.data[0].value, currentData.data[0].value)
    }
    if(prevData.data[2].value && currentData.data[2].value) {
        max = Math.max(prevData.data[2].value, currentData.data[2].value)
    }


    return (
        <BorderCard title={'심박수 변화'}
                    description={`심박수 변화(HRV)는 우리 몸의 회복력과 적응력을 보여주는 지표입니다.`}>
            <SimpleGrid cols={3}>
                {/* 1. 왼쪽 범례 */}
                <Card withBorder >
                    <Center h={'100%'}>
                        <Stack gap={0} align="flex-start">
                            <LegendItem label="최대값" color={'blue'}/>
                            <VerticalLine/>
                            <LegendItem label="평균" color={'blue'}/>
                            <VerticalLine/>
                            <LegendItem label="최소값" color={'blue'}/>
                        </Stack>
                    </Center>
                </Card>

                <Card withBorder>
                    <HorizontalDotPlot data={prevData} range={[min, max]}/>
                </Card>
                <Card withBorder>
                    <HorizontalDotPlot data={currentData} range={[min, max]}/>
                </Card>
            </SimpleGrid>
        </BorderCard>
    );
};

// 1. 데이터 구조 변경

function HorizontalDotPlot({data, range}: {
    data: {
        color: MantineColor;
        name: string;
        data: Record<string, number>[];
    },
    range: [number, number]
}) {
    if (data.data.length === 0) return (
        <>Empty</>
    )
    return (
        <ReScatterChart
            h={200}
            data={[data] as any}
            dataKey={{x: 'age', y: 'value'}}
            xAxisProps={{ticks: [0]}}
            yAxisProps={{domain: range}}
            tooltipAnimationDuration={200}
            pointLabels="y"
        ></ReScatterChart>
    );
}