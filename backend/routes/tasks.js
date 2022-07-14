import express from 'express';
const router = express.Router();
import {
  getToDo,
  saveToDo,
  deleteToDo,
  updateToDo,
} from '../controller/ToDoController.js';

router.get('/', getToDo);
router.post('/', saveToDo);
router.delete('/:id', deleteToDo);
router.put('/:id', updateToDo);

export default router;
