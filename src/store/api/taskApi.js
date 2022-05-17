import axiosService from 'store/axiosService'
import { POST_NEW_TASK, SERVER_URL, UPDATE_TASK_NAME, UPDATE_TASK_STATE } from 'store/constraint';

export const postNewTaskApi = (data) => {
    return axiosService.post(`${SERVER_URL}/${POST_NEW_TASK}`, data);
};

export const updateTaskNameApi = (data) => {
    return axiosService.put(`${SERVER_URL}/${UPDATE_TASK_NAME}`, data);
}


export const updateTaskStateApi = (data) => {
    return axiosService.put(`${SERVER_URL}/${UPDATE_TASK_STATE}`, data);
}