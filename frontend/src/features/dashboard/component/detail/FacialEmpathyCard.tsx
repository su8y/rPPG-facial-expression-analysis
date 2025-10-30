import {Badge, Table, Text} from '@mantine/core';
import {EMOTION_EMOJI, EMOTION_NAMES, MATCH_STATUS} from '../../utils/constants';
import type {EmotionType, EmpathyDetail, EmpathyRow, ScoreBeforeAfter} from "../../types/rppg.type.ts";
import {EmptyTableTd} from "../EmptyTableTd.tsx";
import {DetailSection} from "./DetailSection.tsx";
import {DETAIL_SECTION_ITEMS} from "../../utils/messages.ts";

interface FacialEmpathyCardProps {
    data: EmpathyDetail;
}

type EmpathyRowData = { emotion: EmotionType, row: EmpathyRow, score: ScoreBeforeAfter } | {
    emotion: EmotionType;
    isInactive: true
};

export const FacialEmpathyCard = ({data}: FacialEmpathyCardProps) => {
    const allEmotions = Object.keys(EMOTION_NAMES) as EmotionType[];
    const activeRowData: EmpathyRowData[] = [];
    const inactiveRowData: EmpathyRowData[] = [];

    allEmotions.forEach((emotion, index) => {
        // Assuming the arrays in the data prop are ordered corresponding to allEmotions
        const row = data.emotionRows?.[index];
        const score = data.empathyScores?.[index];

        if (row && score) {
            activeRowData.push({emotion, row, score});
        } else {
            inactiveRowData.push({emotion, isInactive: true});
        }
    });

    const sortedRowData = [...activeRowData, ...inactiveRowData];

    return (
        <DetailSection {...DETAIL_SECTION_ITEMS.FACIAL_EMPATHY}>
            <Table verticalSpacing="xs" mt="md">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>제시된 감정</Table.Th>
                        <Table.Th>AI 표정분석</Table.Th>
                        <Table.Th>나의 감정</Table.Th>
                        <Table.Th>일치 여부</Table.Th>
                        <Table.Th>공감도</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {sortedRowData.map(item => {
                        if ('isInactive' in item) {
                            return (
                                <Table.Tr key={item.emotion}>
                                    <Table.Td>{EMOTION_NAMES[item.emotion]}</Table.Td>
                                    <EmptyTableTd value={'슬픔(80%)'}/>
                                    <EmptyTableTd value={'중립'}/>
                                    <EmptyTableTd value={'불일치'}/>
                                    <EmptyTableTd value={'00점 → 00점'}/>
                                </Table.Tr>
                            );
                        }

                        const {emotion, row, score} = item;
                        const isMatch = emotion === row.myEmotion;
                        let scoreColor = 'black';
                        if (score.after > score.before) scoreColor = 'green';
                        else if (score.after < score.before) scoreColor = 'red';

                        return (
                            <Table.Tr key={emotion}>
                                <Table.Td>{EMOTION_NAMES[emotion]}{EMOTION_EMOJI[emotion]}</Table.Td>
                                <Table.Td>{EMOTION_NAMES[row.aiAnalysis.emotion]} ({row.aiAnalysis.percentage}%)</Table.Td>
                                <Table.Td>{EMOTION_NAMES[row.myEmotion]}</Table.Td>
                                <Table.Td>
                                    <Badge
                                        color={isMatch ? 'green' : 'red'}>{isMatch ? MATCH_STATUS.MATCH : MATCH_STATUS.MISMATCH}</Badge>
                                </Table.Td>
                                <Table.Td>
                                    <Text>
                                        {score.before}점 → <Text component="span" c={scoreColor}
                                                                fw={700}>{score.after}점</Text>
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        );
                    })}
                </Table.Tbody>
            </Table>
        </DetailSection>
    );
};
