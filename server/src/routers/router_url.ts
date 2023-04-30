import express from 'express';
import { FetchData } from '../controllers/url_controller';

const router = express.Router();

router.post('/fetch', FetchData);

export default router;