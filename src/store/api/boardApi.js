import axiosService from 'store/axiosService'
import { GET_ALL_BOARD, GET_BOARD_BY_ID, POST_NEW_BOARD, SERVER_URL } from 'store/constraint';



export const postNewBoardApi = (data) => {
    return axiosService.post(`${SERVER_URL}/${POST_NEW_BOARD}`, data);
};

export const getAllBoardApi = () => {
    return axiosService.get(`${SERVER_URL}/${GET_ALL_BOARD}`);
};

export const getBoardByIdApi = (id) => {
    return axiosService.get(`${SERVER_URL}/${GET_BOARD_BY_ID}/${id}`);
};