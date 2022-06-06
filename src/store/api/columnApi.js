import axiosService from 'store/axiosService'
import { GET_ALL_COLUMN, POST_NEW_COLUMN, SERVER_URL } from 'store/constraint';

export const postNewColumnApi = (data) => {
    return axiosService.post(`${SERVER_URL}/${POST_NEW_COLUMN}`, data);
};

export const getAllColumnApi = (id) => {
    return axiosService.get(`${SERVER_URL}/${GET_ALL_COLUMN}/${id}`);
};

