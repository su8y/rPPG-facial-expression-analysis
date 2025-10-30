import React from 'react';

interface DetailedResultsProps {
    data: any; // Replace 'any' with actual data type
}

export const DetailedResults: React.FC<DetailedResultsProps> = ({ data }) => {
    return (
        <div>
            <h3>상세 결과</h3>
            <p>상세 결과 데이터: {JSON.stringify(data)}</p>
        </div>
    );
};