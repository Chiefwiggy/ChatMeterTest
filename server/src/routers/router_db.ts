import express from 'express';
import {SendUrl, GetAll, GenerateUser, CleanUp} from '../controllers/db_controller'

const router = express.Router();


router.post("/sendURL", SendUrl)
router.get("/getAll", GetAll);
router.post('/generateUser', GenerateUser);
router.delete('/deleteAllUser/:id', CleanUp);


export default router;