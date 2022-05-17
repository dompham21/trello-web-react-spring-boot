import axiosService from "store/axiosService"
import { GET_ALL_BACKGROUND, SERVER_URL } from "store/constraint";

export const getAllBackgroundAPI = () => {
    return axiosService.get(`${SERVER_URL}/${GET_ALL_BACKGROUND}`);
};