import React from 'react';
import { useChart } from '../../hooks/useChart';

interface CandleData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
}

interface CandleStickV2Props {
    datasets: CandleData[];
    activeMenu: number | null;
    indicators: string[];
}

const CandleStickV2: React.FC<CandleStickV2Props> = ({ datasets, activeMenu, indicators }) => {
    const { svgRef } = useChart({
        data: datasets,
        width: 800,
        height: 400,
    });

    return (
        <div className="w-full h-full">
            <svg ref={svgRef} />
        </div>
    );
};

export default CandleStickV2; 