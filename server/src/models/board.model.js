import Joi from 'joi';
import { getDB } from '../config/mongodb.js';

const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date(),
    updatedAt: Joi.date().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);

        const result = await getDB().collection(boardCollectionName).insertOne(value);
        return result.ops[0]
    } catch (error) {
        throw new Error(error)
    }
}

export const BoardModel = { createNew }