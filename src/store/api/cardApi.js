import axiosService from 'store/axiosService'
import { GET_ALL_CARD, POST_NEW_CARD, SERVER_URL, UPDATE_CARD_COLUMN_ID, UPDATE_CARD_COVER, UPDATE_CARD_DESCRIPTION, UPDATE_CARD_DUE_DATE, UPDATE_CARD_TITLE, UPDATE_ORDER_NUM_CARD } from 'store/constraint';

export const postNewCardApi = (data) => {
    return axiosService.post(`${SERVER_URL}/${POST_NEW_CARD}`, data);
};

export const updateCardTitleApi = (data) => {
    return axiosService.put(`${SERVER_URL}/${UPDATE_CARD_TITLE}`, data);
}

export const updateCardDescriptionApi = (data) => {
    return axiosService.put(`${SERVER_URL}/${UPDATE_CARD_DESCRIPTION}`, data);
}


export const updateCardDueDateApi = (data) => {
    return axiosService.put(`${SERVER_URL}/${UPDATE_CARD_DUE_DATE}`, data);
}

export const updateCardCoverApi = (data) => {
    return axiosService.put(`${SERVER_URL}/${UPDATE_CARD_COVER}`, data);
}

export const updateCardColumnIdApi = (data) => {
    return axiosService.put(`${SERVER_URL}/${UPDATE_CARD_COLUMN_ID}`, data);
}

export const updateOrderNumCardApi = (data) => {
    return axiosService.put(`${SERVER_URL}/${UPDATE_ORDER_NUM_CARD}`, data)
}