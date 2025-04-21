import { call, put, takeLatest } from "redux-saga/effects";
import { axiosCall } from "../../utils/customAxios";
import {
    getStocksByMarketSuccess,
    getStocksByMarketFailure,
    getHistoryPricesBySymbolSuccess,
    getHistoryPricesBySymbolFailure,
    getStocksByMarketRequest,
    getHistoryPricesBySymbolRequest
} from '../slicers/stocks';
import { PayloadAction } from "@reduxjs/toolkit";

type GetStocksByMarketPayload = {
    market: string;
    onCallback: (response: { status: number, data?: any, error?: string }) => void;
};

type GetHistoryPricesBySymbolPayload = {
    sym: string;
    from: string;
    to: string;
    onCallback: (response: { status: number, data?: any, error?: string }) => void;
};

function* getStockByMarket(action: PayloadAction<GetStocksByMarketPayload>) {
    const { market, onCallback } = action.payload;
    const { status, data, error } = yield call(axiosCall, {
        url: `/symbol/${market}`,
        method: "get",
    });
    if (status === 200) {
        onCallback({
            status: 1,
            data,
        });
        yield put(getStocksByMarketSuccess({ data }));
    } else {
        onCallback({
            status: 0,
            error,
        });
        yield put(getStocksByMarketFailure({ error }));
    }
}

function* getHistoryPricesBySymbol(action: PayloadAction<GetHistoryPricesBySymbolPayload>) {
    const { sym, from, to, onCallback } = action.payload;
    const { status, data, error } = yield call(axiosCall, {
        url: `/historical-price-full/${sym}?from=${from}&to=${to}`,
        method: "get",
    });

    if (status === 200) {
        onCallback({
            status: 1,
            data,
        });
        yield put(getHistoryPricesBySymbolSuccess({ data: data.historical }));
    } else {
        onCallback({
            status: 0,
            error,
        });
        yield put(getHistoryPricesBySymbolFailure({ error }));
    }
}

export function* watchStocks() {
    yield takeLatest(getStocksByMarketRequest.type, getStockByMarket);
    yield takeLatest(getHistoryPricesBySymbolRequest.type, getHistoryPricesBySymbol);
}
