import {Box, Center, Text} from '@mantine/core';
import {type FC} from "react";
import {BorderCard} from "../border-card.tsx";

type StressLevel = 'Low' | 'Medium' | 'High';

interface StressGaugeProps {
    level: StressLevel;
}

const getStressInfo = (level: StressLevel) => {
    switch (level) {
        case 'Low':
            return {
                position: 25,
                description: '스트레스 수치가 낮아 안정적인 상태입니다.',
            };
        case 'Medium':
            return {
                position: 50,
                description: '다소 스트레스가 있지만, 관리가 가능한 수준입니다.',
            };
        case 'High':
            return {
                position: 75,
                description: '스트레스 수치가 높습니다. 휴식과 전문가의 도움이 필요할 수 있습니다.',
            };
    }
};

export const StressGaugeChart: FC<StressGaugeProps> = ({level}) => {
    const {position, description} = getStressInfo(level);

    return (
        <BorderCard title={'스트레스 수치'}>
            <Box style={{position: 'relative', padding: '20px 0'}}>
                <Box
                    style={{
                        height: '2.5rem',
                        borderRadius: '8px',
                        backgroundImage: 'linear-gradient(to right, #40c057, #fcc419, #fa5252)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <Text c={'white'}>
                        {position} 점
                    </Text>
                </Box>

                <Text style={{
                    position: 'absolute',
                    left: `${position}%`,
                    top: '-5%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                }} size="xl">▼</Text>
            </Box>
            <Center>
                <Text size={'xs'} style={{whiteSpace: 'pre-line'}}>
                    {description}</Text>
            </Center>
        </BorderCard>
    );
};
