import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsState, NewsItem, ApiCallback } from "../../types/redux";
import tempNews from "../../utils/tempDummyNews.json";

const initialState: NewsState = {
    data: [...tempNews.data],
    symbolStr: "AACIW",
    error: null,
    loading: false,
};

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        getNewsBySymbolRequest: (state, action: PayloadAction<{
            params: {
                page: number;
                tickers: string;
            };
            onCallback: ApiCallback<NewsItem[]>;
        }>) => {
            state.loading = true;
        },
        getNewsBySymbolSuccess: (state, action: PayloadAction<{
            data: NewsItem[];
            symbol: string;
        }>) => {
            state.loading = false;
            state.data = action.payload.data;
            state.symbolStr = action.payload.symbol;
        },
        getNewsBySymbolFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getNewsBySymbolRequest,
    getNewsBySymbolSuccess,
    getNewsBySymbolFailure,
} = newsSlice.actions;

export const newsReducer = newsSlice.reducer; 