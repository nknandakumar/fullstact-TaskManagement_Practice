import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import db from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
db.connect();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());


app.get('/', (req, res) => {   
    res.send('Hello World');
  
 });




app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);
  });