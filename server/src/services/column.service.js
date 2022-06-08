import { BoardModel } from "../models/board.model.js"
import { ColumnModel } from "../models/column.model.js"

const createNew = async (data) => {
    try {
        const newCol = await ColumnModel.createNew(data)

        // Update columnOrder Array in Board
        const boardId = newCol.boardId.toString();
        const newColId = newCol._id.toString();
        await BoardModel.pushColumnOrder(boardId, newColId);

        return newCol
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

        const result = await ColumnModel.update(id, updateData)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnService = { createNew, update }