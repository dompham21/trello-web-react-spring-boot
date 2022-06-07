import express from 'express';
import { ColumnController } from '../controllers/column.controller.js';
import { ColumnValidation } from '../validations/column.validation.js';

const router = express.Router();




router.route('/add')
    .post(ColumnValidation.createNew, ColumnController.createNew);

router.route('/:id')
    .put(ColumnValidation.update, ColumnController.update);


export const ColumnRoutes = router;