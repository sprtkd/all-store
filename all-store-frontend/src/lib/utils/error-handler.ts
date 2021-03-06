import { getReasonPhrase } from 'http-status-codes';

export function axiosErrorHandler(error: any, prepend: string) {
    console.error(prepend + " " + error);
    if (error.response) {
        return prepend + " " + getReasonPhrase(error.response.status) + " | " + error.response.data;
    } else {
        return prepend + " " + error.message;
    };
}
