import Joi from 'joi';
import { getDB } from '../config/mongodb.js';
import pkg from 'mongodb';
// @ts-ignore
const { ObjectId } = pkg;

const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
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

const update = async (id, data) => {
    try {
        const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: data },
            { returnOriginal: false}
        );
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

const getBoards = async (id) => {
    try {
        const result = await getDB().collection(boardCollectionName).aggregate([
            {
                $match: {
                    _id: ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'columns',
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'columns'
                }
            },
            {
                $lookup: {
                    from: 'cards',
                    localField: '_id',
                    foreignField: 'boardId',
                    as: 'cards'
                }
            }
        ]).toArray();
        return result[0] || {}
    } catch (error) {
        throw new Error(error)
    }
}

const pushColumnOrder = async (boardId, colId) => {
    try {
        const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
            { _id: ObjectId(boardId) },
            { $push: { columnOrder: colId } },
            { returnOriginal: false}
        );
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}

export const BoardModel = { createNew, update, getBoards, pushColumnOrder }