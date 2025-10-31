import {Box, Center, Flex, Group, Stack, Text} from '@mantine/core';
import {Cell, Pie, PieChart, Tooltip} from 'recharts';
import type {EmotionResult, EmotionType} from "../../types/rppg.type.ts";
import type {FC} from "react";
import {BorderCard} from "../border-card.tsx";

interface EmotionDoughnutChartProps {
    emotion: EmotionType;
    emotionResult: EmotionResult;
}

const EMOTION_COLORS: Record<EmotionType, string> = {
    Angry: '#FF6B6B',
    Disgusted: '#845EF7',
    Fearful: '#4C6EF5',
    Happy: '#FAB005',
    Neutral: '#868E96',
    Sad: '#4263EB',
    Surprised: '#22B8CF',
};

const EMOTION_NAMES: Record<EmotionType, string> = {
    Angry: '분노',
    Disgusted: '혐오',
    Fearful: '두려움',
    Happy: '행복',
    Neutral: '중립',
    Sad: '슬픔',
    Surprised: '놀람',
}

export const EmotionDoughnutChart: FC<EmotionDoughnutChartProps> = ({emotion, emotionResult}) => {
    const data = Object.entries(emotionResult).map(([name, value]) => ({
        name: EMOTION_NAMES[name as EmotionType],
        value,
        color: EMOTION_COLORS[name as EmotionType],
    }));

    const total = data.reduce((sum, entry) => sum + entry.value, 0);
    const mainEmotionValue = total > 0 ? Math.round((emotionResult[emotion] / total) * 100) : 0;

    return (
        <BorderCard title={'감정 분석 결과'}>
            <Group justify={'space-around'}>
                <Box style={{position: 'relative', width: 130, height: 130}}>
                    <PieChart width={130} height={130}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={60}
                            dataKey="value"
                            cornerRadius={5}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                    <Center style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
                        <Stack align="center" gap={0}>
                            <Text size="xl" fw={700} c={EMOTION_COLORS[emotion]}>
                                {EMOTION_NAMES[emotion]}
                            </Text>
                            <Text size="lg" c="dimmed">{mainEmotionValue}%</Text>
                        </Stack>
                    </Center>
                </Box>
                <Stack gap="0" style={{textWrap: 'nowrap'}}>
                    {data.map((entry) => (
                        <Flex key={entry.name} gap="xs">
                            <Box w={12} h={12} bg={entry.color} style={{borderRadius: '50%'}}/>
                            <Text size="sm"
                                  style={{minWidth: 40}}>{entry.name}{total > 0 ? Math.round((entry.value / total) * 100) : 0}%</Text>
                        </Flex>
                    ))}
                </Stack>
            </Group>
        </BorderCard>
    );
};
