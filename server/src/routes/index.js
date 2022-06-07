import express from 'express';
import { BoardRoutes } from './board.route.js';

const router = express.Router();


router.use('/boards', BoardRoutes);

export const api = router