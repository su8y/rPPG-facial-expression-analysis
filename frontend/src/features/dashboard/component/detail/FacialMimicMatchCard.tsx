import React from 'react';
import {Table, Text} from '@mantine/core';
import {EMOTION_NAMES} from '../../utils/constants';
import type {EmotionType, MimicDetail, MimicMatchScore} from "../../types/rppg.type.ts";
import {EmptyTableTd} from "../EmptyTableTd.tsx";
import {DetailSection} from "./DetailSection.tsx";
import {DETAIL_SECTION_ITEMS} from "../../utils/messages.ts";

interface FacialMimicMatchCardProps {
    data: MimicDetail;
}

type MimicRowData = MimicMatchScore | { emotion: EmotionType; isInactive: true };

export const FacialMimicMatchCard: React.FC<FacialMimicMatchCardProps> = ({data}) => {

    const allEmotions = Object.keys(EMOTION_NAMES) as EmotionType[];
    const activeRowData: MimicMatchScore[] = [];
    const inactiveRowData: { emotion: EmotionType; isInactive: true }[] = [];

    allEmotions.forEach(emotion => {
        const rowData = data.matchScores.find(s => s.emotion === emotion);
        if (rowData) {
            activeRowData.push(rowData);
        } else {
            inactiveRowData.push({emotion, isInactive: true});
        }
    });

    const sortedRowData: MimicRowData[] = [...activeRowData, ...inactiveRowData];

    return (
        <DetailSection {...DETAIL_SECTION_ITEMS.FACIAL_MIMIC}>
            <Table verticalSpacing="xs" mt="md">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>제시된 감정</Table.Th>
                        <Table.Th>표정 일치율</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {sortedRowData.map(score => {
                        if ('isInactive' in score) {
                            return (
                                <Table.Tr key={score.emotion}>
                                    <Table.Td>{EMOTION_NAMES[score.emotion]}</Table.Td>
                                    <EmptyTableTd value={'10% -> 15%'}/>
                                </Table.Tr>
                            );
                        }

                        let color = 'black';
                        if (score.after > score.before) color = 'green';
                        else if (score.after < score.before) color = 'red';

                        return (
                            <Table.Tr key={score.emotion}>
                                <Table.Td>{EMOTION_NAMES[score.emotion]}</Table.Td>
                                <Table.Td>
                                    <Text>
                                        {score.before}% → <Text component="span" c={color}
                                                                fw={700}>{score.after}%</Text>
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
