import Joi from 'joi';
import { getDB } from '../config/mongodb.js';
import pkg from 'mongodb';
// @ts-ignore
const { ObjectId } = pkg;

const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
    columnId: Joi.string().required(),
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(50),
    description: Joi.string().min(3).max(255),
    cover: Joi.string().default(null),
    dueDate: Joi.date().default(null),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);

        const insertValue = {
            ...value,
            boardId: ObjectId(value.boardId),
            columnId: ObjectId(value.columnId)
        }

        const result = await getDB().collection(cardCollectionName).insertOne(insertValue);
        return result.ops[0]
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const result = await getDB().collection(cardCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: data },
            { returnOriginal: false }
        );
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}


export const CardModel = { createNew, update }