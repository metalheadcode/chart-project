export interface ApiResponse<T = any> {
    status: number;
    data?: T;
    error?: {
        code: number;
        message: string;
    };
}

export interface AxiosConfig {
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
    data?: any;
    params?: Record<string, any>;
    headers?: Record<string, string>;
}

export interface Indicator {
    id: number;
    code: string;
    name: string;
} 