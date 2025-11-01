import {Badge, Box, Table, Text} from '@mantine/core';
import {EMOTION_EMOJI, EMOTION_NAMES} from '../../utils/constants';
import type {EmotionType, ReplicationDetail} from "../../types/rppg.type.ts";
import {BlurOverlay} from "../../../../components";
import type {ReactNode} from "react";
import {EmptyTableTd} from "../empty-table-td.tsx";
import {BorderCard} from "../border-card.tsx";
import {DETAIL_SECTION_ITEMS} from "../../utils/messages.ts";

interface FacialReplicationCardProps {
    data: ReplicationDetail;
}

const NATURAL_THRESHOLD = 0.7;

export const FacialReplicationSection = ({data}: FacialReplicationCardProps) => {
    const allEmotions = Object.keys(EMOTION_NAMES) as EmotionType[];
    const activeRows: ReactNode[] = [];
    const inactiveRows: ReactNode[] = [];

    allEmotions.forEach((emotion) => {
        const rowData = data.replicationRows.find(r => r.proposedEmotion === emotion);

        if (!rowData) {
            inactiveRows.push(
                <Table.Tr key={emotion}>
                    <Table.Td>{EMOTION_NAMES[emotion]}{EMOTION_EMOJI[emotion]}</Table.Td>
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
            if (current > previous) color = 'green';
            else if (current < previous) color = 'red';

            activeRows.push(
                <Table.Tr key={emotion}>
                    <Table.Td>{EMOTION_NAMES[emotion]}{EMOTION_EMOJI[emotion]}</Table.Td>
                    <Table.Td>
                        <Text>
                            {EMOTION_NAMES[detectedEmotion]} ({previous}% → <Text component="span" c={color}
                                                                                  fw={700}>{current}%</Text>)
                        </Text>
                    </Table.Td>
                    <Table.Td>
                        <Badge color={result ? 'green' : 'orange'}>{result ? '자연스러움' : '부자연스러움'}</Badge>
                    </Table.Td>
                </Table.Tr>
            );
        }
    });

    return (
        <BorderCard {...DETAIL_SECTION_ITEMS.FACIAL_REPLICATION}>
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
        </BorderCard>
    );
};
