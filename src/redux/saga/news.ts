import { call, put, takeLatest } from "redux-saga/effects";
import { axiosCall } from "../../utils/customAxios";
import { getNewsBySymbolSuccess, getNewsBySymbolFailure } from '../slicers/news';
import { getNewsBySymbolRequest } from '../slicers/news';
import { PayloadAction } from "@reduxjs/toolkit";

type GetNewsBySymbolPayload = {
    params: { page: number, tickers: string };
    onCallback: (response: { status: number, data?: any, error?: string }) => void;
};

function* getNewsBySymbol(action: PayloadAction<GetNewsBySymbolPayload>) {
    const { params, onCallback } = action.payload;
    const { status, data, error } = yield call(axiosCall, {
        url: `/stock_news`,
        method: "get",
        params: {
            ...params,
            limit: 50,
        },
    });

    if (status === 200) {
        onCallback({
            status: 1,
            data,
        });
        yield put(getNewsBySymbolSuccess({ data, symbol: params.tickers }));
    } else {
        onCallback({
            status: 0,
            error,
        });
        yield put(getNewsBySymbolFailure(error));
    }
}

export function* watchNews() {
    yield takeLatest(getNewsBySymbolRequest.type, getNewsBySymbol);
}
