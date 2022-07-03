import express from 'express';
const router = express.Router();
import {
  getToDo,
  saveToDo,
  deleteToDo,
  updateToDo,
} from '../controller/ToDoController.js';

router.get('/todo', getToDo);
router.post('/todo', saveToDo);
router.delete('/todo/:id', deleteToDo);
router.put('/todo/:id', updateToDo);

export default router;
