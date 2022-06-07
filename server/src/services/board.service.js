import { BoardModel } from "../models/board.model.js"

const createNew = async (data) => {
    try {
        const result = await BoardModel.createNew(data)
        return result
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

        const result = await BoardModel.update(id, updateData)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const BoardService = { createNew, update }