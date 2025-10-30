import React from 'react';
import {SimpleGrid} from '@mantine/core';
import {FacialEmpathyCard} from './detail/FacialEmpathyCard.tsx';
import {FacialMimicMatchCard} from './detail/FacialMimicMatchCard.tsx';
import {FacialRecognitionCard} from "./detail/FacialRecognitionCard.tsx";
import type {DashboardData} from "../types/rppg.type.ts";
import {FacialReplicationCard} from "./detail/FacialReplicationCard.tsx";

export interface DetailedResultsProps {
    data: DashboardData;
}

export const DetailedResults: React.FC<DetailedResultsProps> = ({data}) => {
    return (
        <SimpleGrid cols={1} spacing="lg">
            <FacialEmpathyCard data={data.detailed.empathy}/>
            <FacialMimicMatchCard data={data.detailed.mimic}/>
            <FacialRecognitionCard data={data.detailed.recognition}/>
            <FacialReplicationCard data={data.detailed.replication}/>
        </SimpleGrid>
    );
};