import Joi from 'joi';
import { getDB } from '../config/mongodb.js';

const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    columnId: Joi.string().required(),
    description: Joi.string().required().min(3).max(255),
    cover: Joi.string().default(null),
    dueDate: Joi.date().default(null),
    createdAt: Joi.date(),
    updatedAt: Joi.date().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);
        const result = await getDB().collection(cardCollectionName).insertOne(value);
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

export const CardModel = { createNew }