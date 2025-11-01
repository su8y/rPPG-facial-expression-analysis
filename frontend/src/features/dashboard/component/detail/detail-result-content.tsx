import {SimpleGrid} from '@mantine/core';
import {FacialEmpathySection} from './facial-empathy-section.tsx';
import {FacialMimicMatchSection} from './facial-mimic-match-section.tsx';
import {FacialRecognitionSection} from "./facial-recognition-section.tsx";
import type {DashboardData} from "../../types/rppg.type.ts";
import {FacialReplicationSection} from "./facial-replication-section.tsx";

export interface DetailResultContentProps {
    data: DashboardData;
}

export const DetailResultContent = ({data}: DetailResultContentProps) => {
    return (
        <SimpleGrid cols={1} spacing="lg">
            <FacialEmpathySection data={data.detailed.empathy}/>
            <FacialMimicMatchSection data={data.detailed.mimic}/>
            <FacialRecognitionSection data={data.detailed.recognition}/>
            <FacialReplicationSection data={data.detailed.replication}/>
        </SimpleGrid>
    );
};