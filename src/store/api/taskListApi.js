import axiosService from 'store/axiosService'
import { POST_NEW_TASK_LIST, SERVER_URL } from 'store/constraint';

export const postNewTaskListApi = (data) => {
    return axiosService.post(`${SERVER_URL}/${POST_NEW_TASK_LIST}`, data);
};