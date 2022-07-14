import ToDoModel from '../models/ToDoModel.js';

export const getToDo = async (req, res) => {
  const Todo = await ToDoModel.find();
  res.send(Todo);
};

export const saveToDo = async (req, res) => {
  const { task } = req.body;
  try {
    await ToDoModel.create({ task });
    res.status(201).send('Added Successfully');
  } catch (error) {
    res.status(500).send(error);
  }
};

export const deleteToDo = async (req, res) => {
  try {
    await ToDoModel.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted Successfully');
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updateToDo = async (req, res) => {
  const { _id, task } = req.body;
  try {
    await ToDoModel.findByIdAndUpdate(_id, { task });
    res.status(200).send('Updated Successfully');
  } catch (error) {
    res.status(500).send(error);
  }
};
