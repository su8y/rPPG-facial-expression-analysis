import React from 'react';

interface BasicResultsProps {
    data: any; // Replace 'any' with actual data type
}

export const BasicResults: React.FC<BasicResultsProps> = ({ data }) => {
    return (
        <div>
            기본결과
        </div>
    );
};