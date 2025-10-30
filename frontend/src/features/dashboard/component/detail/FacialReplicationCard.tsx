import {Badge, Box, Card, Table, Text, Title} from '@mantine/core';
import {EMOTION_NAMES} from '../../utils/constants';
import type {EmotionType, ReplicationDetail} from "../../types/rppg.type.ts";
import {BlurOverlay} from "../../../../components";
import type {ReactNode} from "react";
import {EmptyTableTd} from "../EmptyTableTd.tsx";

interface FacialReplicationCardProps {
    data: ReplicationDetail;
}

const NATURAL_THRESHOLD = 70;

export const FacialReplicationCard = ({data}: FacialReplicationCardProps) => {
    const allEmotions = Object.keys(EMOTION_NAMES) as EmotionType[];
    const activeRows: ReactNode[] = [];
    const inactiveRows: ReactNode[] = [];

    allEmotions.forEach((emotion) => {
        const rowData = data.replicationRows.find(r => r.proposedEmotion === emotion);

        if (!rowData) {
            inactiveRows.push(
                <Table.Tr key={emotion}>
                    <Table.Td>{EMOTION_NAMES[emotion]}</Table.Td>
                    <EmptyTableTd value={<Box style={{position: 'relative'}}>
                        <Text component="div" c="dimmed">중립 (15점 → 20점)</Text>
                    </Box>}></EmptyTableTd>
                    <EmptyTableTd value={<Box style={{position: 'relative'}}>
                        <Badge color="orange" variant="light">부자연스러움</Badge>
                        <BlurOverlay/>
                    </Box>}/>
                </Table.Tr>
            );
        } else {
            const {previous, current, emotion: detectedEmotion} = rowData.aiAnalysis;
            const result = current >= NATURAL_THRESHOLD;
            let color = 'black';
            if (current > previous) color = 'blue';
            else if (current < previous) color = 'red';

            activeRows.push(
                <Table.Tr key={emotion}>
                    <Table.Td>{EMOTION_NAMES[emotion]}</Table.Td>
                    <Table.Td>
                        <Text>
                            {EMOTION_NAMES[detectedEmotion]} ({previous}점 → <Text component="span" c={color}
                                                                                  fw={700}>{current}점</Text>)
                        </Text>
                    </Table.Td>
                    <Table.Td>
                        <Badge color={result ? 'blue' : 'orange'}>{result ? '자연스러움' : '부자연스러움'}</Badge>
                    </Table.Td>
                </Table.Tr>
            );
        }
    });

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4}>표정 지어보기</Title>
            <Text size="sm" c="dimmed" mt="xs" mb="md">
                제시된 감정을 표정으로 표현하는 능력을 AI가 분석합니다.
            </Text>
            <Table verticalSpacing="xs">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>제시된 감정</Table.Th>
                        <Table.Th>AI 표정 분석</Table.Th>
                        <Table.Th>결과</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{[...activeRows, ...inactiveRows]}</Table.Tbody>
            </Table>
        </Card>
    );
};
