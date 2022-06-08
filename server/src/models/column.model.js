import Joi from 'joi';
import { getDB } from '../config/mongodb.js';
import pkg from 'mongodb';
// @ts-ignore
const { ObjectId } = pkg;

const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
    boardId: Joi.string().required(),
    title: Joi.string().required().min(3).max(50),
    cardOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data);

        const insertValue = {
            ...value,
            boardId: ObjectId(value.boardId)
        }

        const result = await getDB().collection(columnCollectionName).insertOne(insertValue);
        
        return result.ops[0]
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: data },
            { returnOriginal: false } 
        );
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

const pushCardOrder = async (colId, cardId) => {
    try {
        const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
            { _id: ObjectId(colId) },
            { $push: { cardOrder: cardId } },
            { returnOriginal: false}
        );
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const ColumnModel = { createNew, update, pushCardOrder }