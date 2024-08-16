import express from 'express';
import { getScryfallData, getPriceHistoryData } from '../controllers/oracleCardControllers.js';

const router = express.Router();

router.get('/', getScryfallData);
router.get('/:mtgo_id', getPriceHistoryData);

export default router;
