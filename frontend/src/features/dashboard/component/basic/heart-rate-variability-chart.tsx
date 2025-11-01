import {Grid, Group, Stack, Text, Title} from '@mantine/core';
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
            <Grid gutter="md">
                <Grid.Col span={{base: 6, sm: 4}}>
                    <Stack align="center" gap={0}>
                        <Title order={6}>이전: {prevValue}ms</Title>
                        <Gauge value={prevValue} max={200}/>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{base: 6, sm: 4}} order={{sm: 3}}>
                    <Stack align="center" gap={0}>
                        <Title order={6}>현재: {currValue}ms</Title>
                        <Gauge value={currValue} max={200}/>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{base: 12, sm: 4}} order={{base: 3, sm: 2}}>
                    <Stack align="center" gap={0}>
                        <Group>
                            <Text size="sm" >현재:</Text>
                            <Text size={'xl'} fw={700}>{currValue}</Text>
                            <Text size="sm" >ms</Text>
                        </Group>
                        <Text ta='center' size='xs' style={{whiteSpace: 'pre-line'}}>
                            {`심박 변이도는 심장이 얼마나 유연하게
                            조절되는 지를 알려주는 지표에요.
                            해당 값이 높을수록 건강한 상태를 의미해요`}
                        </Text>
                    </Stack>
                </Grid.Col>

            </Grid>
        </BorderCard>
    );
};