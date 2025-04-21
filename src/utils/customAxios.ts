import axios, { AxiosResponse } from 'axios';
import { AxiosConfig } from '../types';

interface CustomApiResponse<T = any> {
    data: T;
    status: number;
    message?: string;
}

// Intercept HTTP responses
axios.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        // Restructure response here
        if (
            response.status === 200 &&
            response.data &&
            typeof response.data === 'object'
        ) {
            return {
                ...response,
                data: {
                    data: response.data,
                    status: response.status,
                },
            };
        }
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const axiosCall = async (config: AxiosConfig): Promise<CustomApiResponse> => {
    const { method, url, data, params } = config;

    const finalUrl = `${process.env.REACT_APP_API_URL}${url}`;

    return axios({
        method,
        url: finalUrl,
        data,
        params: {
            ...params,
            apikey: process.env.REACT_APP_API_KEY,
        },
    })
        .then((res) => res)
        .catch((err) => err);
};

export default axios; 