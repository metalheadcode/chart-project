import { MutableRefObject } from 'react';

export interface StockData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface ChartDataset {
    x: Date;
    s: number;
    h: number;
    l: number;
    color: string;
}

export interface SymbolData {
    symbol: string;
    [key: string]: any;
}

export interface CandleStickV2Props {
    datasets: StockData[];
    activeMenu: string | null;
    indicators?: string[];
}

export interface CandleStickProps {
    symbol: SymbolData;
    chartDatasets: ChartDataset[];
    chartDatasetColors: string[];
    numOfDay: number;
    setNumOfDay: (value: number) => void;
    symbolLog: MutableRefObject<Record<string, {
        numOfDay: number;
        from: string;
        to: string;
    }> | null>;
}

export interface ChartColors {
    green: string;
    red: string;
    subtleBorder: string;
}

export interface IndicatorConfig {
    stroke?: {
        [key: string]: string;
    };
    fill?: {
        [key: string]: string;
    };
}

export interface SizeContextType {
    size: {
        width: number;
        height: number;
    };
} 