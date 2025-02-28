import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import db from './config/db.js';
//Routes
import todoRoutes from './routes/TodoRoutes.js';
import bookmarkRoutes from './routes/BookMarkRoutes.js';
import noteRoutes from './routes/NoteRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
db.connect();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/todos', todoRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use('/api/notes', noteRoutes);





app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);
  });