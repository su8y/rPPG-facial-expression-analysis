import {Group, Stack, Text, Title} from '@mantine/core';
import {BorderCard} from "../border-card.tsx";
import {Gauge} from "../gauge.tsx";

interface HeartRateVariabilityChartProps {
    previousHrv: string;
    currentHrv: string;
}


export const HeartRateVariabilityChart = ({previousHrv, currentHrv}: HeartRateVariabilityChartProps) => {
    const prevValue = parseInt(previousHrv, 10);
    const currValue = parseInt(currentHrv, 10);

    return (
        <BorderCard title={'심박 변이도 (HRV)'}>
            <Group gap={0} justify={'space-between'}>
                <Stack align="center" gap={0}>
                    <Title order={6}>이전</Title>
                    <Gauge value={prevValue} max={200}/>
                </Stack>
                <Stack align="center" gap={0} mx="xs">
                    <Title order={2}>{currValue}</Title>
                    <Text size="sm" c="dimmed">ms</Text>
                </Stack>
                <Stack align="center" gap={0}>
                    <Title order={6}>현재</Title>
                    <Gauge value={currValue} max={200}/>
                </Stack>
            </Group>
        </BorderCard>
    );
};