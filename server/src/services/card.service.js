import { CardModel } from "../models/card.model.js"
import { ColumnModel } from "../models/column.model.js";

const createNew = async (data) => {
    try {
        const newCard = await CardModel.createNew(data)


        // Update columnOrder Array in Column
        const columnId = newCard.columnId.toString();
        const newCardId = newCard._id.toString();
        await ColumnModel.pushCardOrder(columnId, newCardId);
        
        return newCard
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updatedDate: Date.now()
        }

        const result = await CardModel.update(id, updateData)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const CardService = { createNew, update }