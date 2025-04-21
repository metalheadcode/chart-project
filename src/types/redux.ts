export interface ErrorState {
    error: string | null;
    loading: boolean;
}

export interface StockItem {
    symbol: string;
    name: string;
    price: number;
    priceAvg50: number;
    priceAvg200: number;
    change: number;
    dayLow: number;
    dayHigh: number;
    yearLow: number;
    yearHigh: number;
    marketCap: number;
    timestamp: number;
    volume: number;
}

export interface HistoricalPrice {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface StockState {
    data: StockItem[];
    marketStr: string | null;
    prices: HistoricalPrice[];
    symbolStr: string | null;
    error: string | null;
    loading: boolean;
}

export interface NewsItem {
    title: string;
    date: string;
    symbol: string;
    content: string;
    url: string;
    source: string;
}

export interface NewsState extends ErrorState {
    data: NewsItem[];
    symbolStr: string;
}

export interface MarketsState extends ErrorState {
    data: any[];
}

export type RootState = {
    stocks: StockState;
    news: NewsState;
    markets: MarketsState;
};

export interface ApiResponse<T> {
    status: number;
    data?: T;
    error?: string;
}

export interface ApiCallback<T> {
    (response: ApiResponse<T>): void;
}

// Action type constants (can be removed after migration to Redux Toolkit)
export const GET_NEWS_BY_SYMBOL = {
    REQUEST: 'NEWS/GET_NEWS_BY_SYMBOL_REQUEST',
    SUCCESS: 'NEWS/GET_NEWS_BY_SYMBOL_SUCCESS',
    FAILURE: 'NEWS/GET_NEWS_BY_SYMBOL_FAILURE',
} as const;

export const GET_STOCKS_BY_MARKET = {
    REQUEST: 'STOCKS/GET_STOCKS_BY_MARKET_REQUEST',
    SUCCESS: 'STOCKS/GET_STOCKS_BY_MARKET_SUCCESS',
    FAILURE: 'STOCKS/GET_STOCKS_BY_MARKET_FAILURE',
} as const;

export const GET_HISTORY_PRICES_BY_SYMBOL = {
    REQUEST: 'STOCKS/GET_HISTORY_PRICES_BY_SYMBOL_REQUEST',
    SUCCESS: 'STOCKS/GET_HISTORY_PRICES_BY_SYMBOL_SUCCESS',
    FAILURE: 'STOCKS/GET_HISTORY_PRICES_BY_SYMBOL_FAILURE',
} as const;

export const GET_MARKETS = {
    REQUEST: 'MARKETS/GET_MARKETS_REQUEST',
    SUCCESS: 'MARKETS/GET_MARKETS_SUCCESS',
    FAILURE: 'MARKETS/GET_MARKETS_FAILURE',
} as const;

// Action Interfaces
export interface StocksByMarketRequestAction {
    type: typeof GET_STOCKS_BY_MARKET.REQUEST;
}

export interface StocksByMarketSuccessAction {
    type: typeof GET_STOCKS_BY_MARKET.SUCCESS;
    data: StockItem[];
    market: string;
}

export interface StocksByMarketFailureAction {
    type: typeof GET_STOCKS_BY_MARKET.FAILURE;
    error: ErrorState;
}

export interface HistoryPricesBySymbolRequestAction {
    type: typeof GET_HISTORY_PRICES_BY_SYMBOL.REQUEST;
}

export interface HistoryPricesBySymbolSuccessAction {
    type: typeof GET_HISTORY_PRICES_BY_SYMBOL.SUCCESS;
    data: {
        historical: HistoricalPrice[];
        symbol: string;
    };
}

export interface HistoryPricesBySymbolFailureAction {
    type: typeof GET_HISTORY_PRICES_BY_SYMBOL.FAILURE;
    error: ErrorState;
}

export interface NewsBySymbolRequestAction {
    type: typeof GET_NEWS_BY_SYMBOL.REQUEST;
}

export interface NewsBySymbolSuccessAction {
    type: typeof GET_NEWS_BY_SYMBOL.SUCCESS;
    data: NewsItem[];
}

export interface NewsBySymbolFailureAction {
    type: typeof GET_NEWS_BY_SYMBOL.FAILURE;
    error: ErrorState;
}

export type StockActionTypes =
    | StocksByMarketRequestAction
    | StocksByMarketSuccessAction
    | StocksByMarketFailureAction
    | HistoryPricesBySymbolRequestAction
    | HistoryPricesBySymbolSuccessAction
    | HistoryPricesBySymbolFailureAction;

export type NewsActionTypes =
    | NewsBySymbolRequestAction
    | NewsBySymbolSuccessAction
    | NewsBySymbolFailureAction; 