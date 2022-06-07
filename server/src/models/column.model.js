import Joi from 'joi';
import { getDB } from '../config/mongodb.js';

const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(50),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date(),
    updatedAt: Joi.date().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(columnCollectionName).insertOne(value);
        console.log(result.ops[0])

        return result
    } catch (error) {
        console.log(error)
    }
}

export const ColumnModel = { createNew }