import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const PORT = 3001;

import dbRouter from './routers/router_db';
import urlRouter from './routers/router_url';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/database", dbRouter);
app.use('/url', urlRouter);


mongoose.connect(process.env.MONGO_URL ?? '');

const server = app.listen(PORT, () => {
    console.log(`Server's up on PORT ${PORT}!`);
});


const App = {
    server, app
}
export default App;