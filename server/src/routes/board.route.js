import express from 'express';
import { BoardController } from '../controllers/board.controller.js';
import { BoardValidation } from '../validations/board.validation.js';

const router = express.Router();

router.route('/add')
    .post(BoardValidation.createNew, BoardController.createNew)


router.route('/:id')
    .put(BoardValidation.update, BoardController.update)

export const BoardRoutes = router;