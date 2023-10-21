import { connect } from 'mongoose';
import express, { json } from 'express';
import { json as _json } from 'body-parser';
import cors from 'cors';
require('dotenv').config();

import registerRoute from './routes/register';
const app = express();

const uri = process.env.DB_URI

connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.error('Something went wrong', err));

app.use(_json());
app.use(cors());
app.use(json())
app.use('/api',[registerRoute]);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Started on Port: ${port}`)
});