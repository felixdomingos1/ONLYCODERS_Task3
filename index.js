import express, { json } from 'express';
import { json as _json } from 'body-parser';
import cors from 'cors';
require('dotenv').config();

import registerRoute from './routes/register';
const app = express();


app.use(_json());
app.use(cors());
app.use(json())
app.use('/api',[registerRoute]);

const connection = async () =>{
    const port = process.env.PORT || 5000;
    try {
        await mongoose.connect(process.env.DB_URI)
    } catch (err) {
        console.log(err);
        
    }
    app.listen(port, () => {
        console.log(`Server Started on Port: ${port}`)
    });
  }
  connection()