import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GET_MARKETS, MarketsState } from "../../types/redux";
import tempMarkets from "../../utils/tempDummyMarkets.json";

const initialState: MarketsState = {
    data: [...tempMarkets.data],
    error: null,
    loading: false,
};

const marketsSlice = createSlice({
    name: 'markets',
    initialState,
    reducers: {
        getMarketsRequest: (state) => {
            state.loading = true;
        },
        getMarketsSuccess: (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.data = action.payload;
        },
        getMarketsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getMarketsRequest,
    getMarketsSuccess,
    getMarketsFailure,
} = marketsSlice.actions;

export const marketsReducer = marketsSlice.reducer; 