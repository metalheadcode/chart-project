import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StockState, StockItem, HistoricalPrice } from '../../types/redux';

const initialState: StockState = {
    data: [],
    marketStr: null,
    prices: [],
    symbolStr: null,
    error: null,
    loading: false
};

const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        getStocksByMarketRequest: (state, action: PayloadAction<{ market: string, onCallback?: (response: { status: number, error?: string }) => void }>) => {
            state.loading = true;
            state.marketStr = action.payload.market;
        },
        getStocksByMarketSuccess: (state, action: PayloadAction<{ data: StockItem[] }>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.error = null;
        },
        getStocksByMarketFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
        },
        getHistoryPricesBySymbolRequest: (state, action: PayloadAction<{ sym: string, from: string, to: string, onCallback?: (response: { status: number, error?: string, data?: { historical: any[] } }) => void }>) => {
            state.loading = true;
            state.symbolStr = action.payload.sym;
        },
        getHistoryPricesBySymbolSuccess: (state, action: PayloadAction<{ data: HistoricalPrice[] }>) => {
            state.loading = false;
            state.prices = action.payload.data;
            state.error = null;
        },
        getHistoryPricesBySymbolFailure: (state, action: PayloadAction<{ error: string }>) => {
            state.loading = false;
            state.error = action.payload.error;
        }
    }
});

export const {
    getStocksByMarketRequest,
    getStocksByMarketSuccess,
    getStocksByMarketFailure,
    getHistoryPricesBySymbolRequest,
    getHistoryPricesBySymbolSuccess,
    getHistoryPricesBySymbolFailure
} = stocksSlice.actions;

export const stocksReducer = stocksSlice.reducer; 