import express from 'express';
import { getTodos,toggleTodo, createTodo, updateTodo, deleteTodo } from '../controllers/TodoController.js';

const router = express.Router();

router.get('/', getTodos);
router.put('/:id',toggleTodo)
router.post('/', createTodo);
router.put('/update/:id', updateTodo);
router.delete('/:id', deleteTodo);


export default router;