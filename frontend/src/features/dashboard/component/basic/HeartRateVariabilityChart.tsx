import { Paper, Text, Group, Stack, Title } from '@mantine/core';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface HeartRateVariabilityChartProps {
    previousHrv: string;
    currentHrv: string;
}

const GAUGE_MAX = 200;
const COLORS = ['#4C6EF5', '#22B8CF', '#FAB005', '#FF6B6B'];
const gaugeData = [
    { name: 'Low', value: 50, color: COLORS[0] },
    { name: 'Normal', value: 50, color: COLORS[1] },
    { name: 'High', value: 50, color: COLORS[2] },
    { name: 'Very High', value: 50, color: COLORS[3] },
];

const Needle = ({ value, cx, cy }: { value: number, cx: number, cy: number }) => {
    if (value === null || cx === null || cy === null || isNaN(value)) {
        return <></>;
    }
    const angle = 180 * (1 - value / GAUGE_MAX); // 0(180도) to 100(0도)
    const length = 60; // 바늘 길이
    const x2 = cx + length * Math.cos(-angle * Math.PI / 180);
    const y2 = cy + length * Math.sin(-angle * Math.PI / 180);

    return (
        <>
            {/* 바늘 선 */}
            <path d={`M ${cx} ${cy} L ${x2} ${y2}`} stroke="black" strokeWidth={2} />
            {/* 바늘 중심축 */}
            <circle cx={cx} cy={cy} r={5} fill="black" />
        </>
    );
};

const GaugeChart = ({ value, title }: { value: number; title: string; }) => {
    return (
        <Stack align="center" gap={0}>
            <Title order={6}>{title}</Title>
            <ResponsiveContainer width={200} height={120}>
                <PieChart>
                    <Pie
                        data={gaugeData}
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        cy="80%"
                    >
                        {gaugeData.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                        ))}
                    </Pie>
                    <Needle value={value} cx={100} cy={96} />
                </PieChart>
            </ResponsiveContainer>
             <Text fw={700} size="xl" mt={-20}>{value}</Text>
        </Stack>
    );
};

export const HeartRateVariabilityChart = ({ previousHrv, currentHrv }: HeartRateVariabilityChartProps) => {
    const prevValue = parseInt(previousHrv, 10);
    const currValue = parseInt(currentHrv, 10);

    return (
        <Paper shadow="xs" p="md" mt="md">
            <Title order={4} ta="center" mb="lg">심박 변이도 (HRV)</Title>
            <Group justify="center" align="flex-end">
                <GaugeChart value={prevValue} title="이전" />
                <Stack align="center" gap="xs" mx="lg">
                    <Title order={2}>{currValue}</Title>
                    <Text size="sm" c="dimmed">ms</Text>
                </Stack>
                <GaugeChart value={currValue} title="현재" />
            </Group>
        </Paper>
    );
};