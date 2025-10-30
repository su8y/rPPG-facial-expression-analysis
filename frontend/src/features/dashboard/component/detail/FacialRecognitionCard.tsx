import {Badge, Card, Table, Text, Title} from '@mantine/core';
import {EMOTION_NAMES, SUCCESS_STATUS} from '../../utils/constants';
import type {EmotionType, RecognitionDetail, RecognitionRow} from "../../types/rppg.type.ts";
import {EmptyTableTd} from "../EmptyTableTd.tsx";

interface FacialRecognitionCardProps {
    data: RecognitionDetail;
}

type RecognitionRowData = RecognitionRow | { proposedEmotion: EmotionType; isInactive: true };

export const FacialRecognitionCard = ({data}: FacialRecognitionCardProps) => {
    const allEmotions = Object.keys(EMOTION_NAMES) as EmotionType[];
    const activeRowData: RecognitionRow[] = [];
    const inactiveRowData: { proposedEmotion: EmotionType; isInactive: true }[] = [];

    allEmotions.forEach(emotion => {
        const rowData = data.recognitionRows.find(r => r.proposedEmotion === emotion);
        if (rowData) {
            activeRowData.push(rowData);
        } else {
            inactiveRowData.push({proposedEmotion: emotion, isInactive: true});
        }
    });

    const sortedRowData: RecognitionRowData[] = [...activeRowData, ...inactiveRowData];

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={4}>표정 인지하기</Title>
            <Text size="sm" c="dimmed" mt="xs" mb="md">
                제시된 표정을 얼마나 잘 인지하는지 확인합니다.
            </Text>
            <Table verticalSpacing="xs" mt="md">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>제시된 감정</Table.Th>
                        <Table.Th>내가 선택한 감정</Table.Th>
                        <Table.Th>결과</Table.Th>
                        <Table.Th>정확도</Table.Th>
                        <Table.Th>평균 반응속도</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {sortedRowData.map((row, index) => {
                        const isFirstRow = index === 0;
                        const summaryCells = isFirstRow ? (
                            <>
                                <Table.Td rowSpan={allEmotions.length}>
                                    <Text ta="center">{data.accuracyBefore}% → {data.accuracyAfter}%</Text>
                                </Table.Td>
                                <Table.Td rowSpan={allEmotions.length}>
                                    <Text ta="center">{data.responseTime}ms</Text>
                                </Table.Td>
                            </>
                        ) : null;

                        if ('isInactive' in row) {
                            return (
                                <Table.Tr key={row.proposedEmotion}>
                                    <Table.Td>{EMOTION_NAMES[row.proposedEmotion]}</Table.Td>
                                    <EmptyTableTd value={EMOTION_NAMES['Neutral']}/>
                                    <EmptyTableTd value={<Badge style={{position: 'relative'}} color="red"
                                                                variant="light">{SUCCESS_STATUS.FAILURE}</Badge>}/>
                                    <EmptyTableTd value={''}/>
                                    {summaryCells}
                                </Table.Tr>
                            );
                        } else {
                            const isMatch = row.proposedEmotion === row.myEmotion;
                            return (
                                <Table.Tr key={row.proposedEmotion}>
                                    <Table.Td>{EMOTION_NAMES[row.proposedEmotion]}</Table.Td>
                                    <Table.Td>{EMOTION_NAMES[row.myEmotion]}</Table.Td>
                                    <Table.Td>
                                        <Badge
                                            color={isMatch ? 'green' : 'red'}>{isMatch ? SUCCESS_STATUS.SUCCESS : SUCCESS_STATUS.FAILURE}</Badge>
                                    </Table.Td>
                                    {summaryCells}
                                </Table.Tr>
                            );
                        }
                    })}
                </Table.Tbody>
            </Table>
        </Card>
    );
};
