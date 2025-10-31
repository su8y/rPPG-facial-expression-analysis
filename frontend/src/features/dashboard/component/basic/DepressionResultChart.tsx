import React from 'react';
import {Group, RingProgress, Text} from '@mantine/core';
import {DetailSection} from "../detail/DetailSection.tsx";

interface DepressionResultChartProps {
    score: number;
}

const getDepressionInfo = (score: number) => {
    if (score <= 13) {
        return {
            level: '정상',
            color: 'green',
            description: `현재 우울감이 낮은 수준으로, 안정적인 정서 상태를 유지하고 있습니다.
                          지금처럼 꾸준한 자기 관리로 건강한 마음을 지켜나가세요.`,
        };
    }
    if (score <= 20) {
        return {
            level: '주의',
            color: 'yellow',
            description: `가벼운 수준의 우울감이 나타나고 있습니다.
                          일시적인 감정 기복일 수 있으나, 증상이 악화되지 않도록 적극적인 관심과 관리가 필요합니다.
                            
                          가족, 친구, 이웃 등 주변 사람과의 교류를 늘리고, 필요하다면 지역 사회 상담 기관이나 심리상담센터 등 전문 자원을 활용해보세요. `,
        };
    }
    return {
        level: '심각',
        color: 'red',
        description: `높은 수준의 우울감이 나타나고 있습니다.
                      일상생활에 어려움을 겪을 수 있으며, 혼자 해결하기 어려울 수 있습니다.
                          
                      전문가의 도움을 받아보는 것을 적극적으로 권장합니다.`,
    };
};

export const DepressionResultChart: React.FC<DepressionResultChartProps> = ({score}) => {
    const {level, color, description} = getDepressionInfo(score);

    return (
        <DetailSection title={'우울증 설문 결과'}>
            <Group>
                <RingProgress
                    size={150}
                    thickness={15}
                    sections={[{value: score, color}]}
                    label={
                        <Text c={color} fw={700} ta="center" size="xl">
                            {score}/{27}
                        </Text>
                    }
                />
                <div style={{flex: 1}}>
                    <Text size="lg" fw={700}>결과:{' '}<Text component={'span'} c={color} fw={700}>{level}</Text></Text>
                    <Text size="sm" mt="xs" style={{whiteSpace: 'pre-line'}}>{description}</Text>
                </div>
            </Group>
        </DetailSection>
    );
};