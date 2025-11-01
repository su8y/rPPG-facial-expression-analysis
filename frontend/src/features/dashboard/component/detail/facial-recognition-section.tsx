import {Badge, Center, Stack, Table, Text} from '@mantine/core';
import {EMOTION_EMOJI, EMOTION_NAMES, SUCCESS_STATUS} from '../../utils/constants';
import type {EmotionType, RecognitionDetail, RecognitionRow} from "../../types/rppg.type.ts";
import {EmptyTableTd} from "../empty-table-td.tsx";
import {BorderCard} from "../border-card.tsx";
import {DETAIL_SECTION_ITEMS} from "../../utils/messages.ts";
import {Gauge} from "../gauge.tsx";

interface FacialRecognitionSectionProps {
    data: RecognitionDetail;
}

type RecognitionRowData = RecognitionRow | { proposedEmotion: EmotionType; isInactive: true };

export const FacialRecognitionSection = ({data}: FacialRecognitionSectionProps) => {
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

    const correctRows = activeRowData.filter(row => row.proposedEmotion === row.myEmotion);

    return (
        <BorderCard {...DETAIL_SECTION_ITEMS.FACIAL_RECOGNITION}>
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

                        let color = 'black';
                        if (data.accuracyAfter > data.accuracyBefore) color = 'green';
                        else if (data.accuracyAfter < data.accuracyBefore) color = 'red';
                        const summaryCells = isFirstRow ? (
                            <>
                                <Table.Td rowSpan={allEmotions.length}>
                                    <Stack>
                                        <Text size={'xs'} ta={'center'} style={{whiteSpace: 'pre-line'}}>
                                            {`${sortedRowData.length}개의 감정 중 
                                            ${correctRows.length}개를 맞추셨습니다.`}
                                        </Text>
                                        <Text size={'sm'} ta={'center'}>
                                            {data.accuracyBefore}% → <Text component="span" c={color}
                                                                           fw={700}>{data.accuracyAfter}%</Text>
                                        </Text>
                                    </Stack>
                                </Table.Td>
                                <Table.Td rowSpan={allEmotions.length}>
                                    <Center h={30}>
                                        <Gauge value={data.responseTime} max={1000}/>
                                    </Center>
                                    <Text ta="center" size={'md'} fw={600}>
                                        <Text component={'span'} size={'xl'} fw={750}>{data.responseTime}</Text>
                                        {' '}ms
                                    </Text>
                                </Table.Td>
                            </>
                        ) : null;

                        if ('isInactive' in row) {
                            return (
                                <Table.Tr key={row.proposedEmotion}>
                                    <Table.Td>{EMOTION_NAMES[row.proposedEmotion]}{EMOTION_EMOJI[row.proposedEmotion]}</Table.Td>
                                    <EmptyTableTd value={EMOTION_NAMES['Neutral']}/>
                                    <EmptyTableTd value={<Badge style={{position: 'relative'}} color="red"
                                                                variant="light">{SUCCESS_STATUS.FAILURE}</Badge>}/>
                                    {summaryCells}
                                </Table.Tr>
                            );
                        } else {
                            const isMatch = row.proposedEmotion === row.myEmotion;
                            return (
                                <Table.Tr key={row.proposedEmotion}>
                                    <Table.Td>{EMOTION_NAMES[row.proposedEmotion]}{EMOTION_EMOJI[row.proposedEmotion]}</Table.Td>
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
        </BorderCard>
    );
};
