import express from 'express';
import { BoardRoutes } from './board.route.js';
import { CardRoutes } from './card.route.js';
import { ColumnRoutes } from './column.route.js';

const router = express.Router();
router.use('/columns', ColumnRoutes);


router.use('/boards', BoardRoutes);
router.use('/cards', CardRoutes);

export const api = router