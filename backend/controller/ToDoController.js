import ToDoModel from '../models/ToDoModel.js';

export const getToDo = async (req, res) => {
  const Todo = await ToDoModel.find();
  res.send(Todo);
};

export const saveToDo = async (req, res) => {
  const { task } = req.body;
  ToDoModel.create({ task })
    .then(() => res.status(201).send('Added Successfully'))
    .catch((err) => console.log(err));
};

export const deleteToDo = (req, res) => {
  // const { _id } = req.params.id;

  ToDoModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(201).send('Deleted Successfully'))
    .catch((err) => console.log(err));
};

export const updateToDo = async (req, res) => {
  const { _id, task } = req.body;
  console.log(await ToDoModel.findById(_id));

  ToDoModel.findByIdAndUpdate(_id, { task })
    .then(() => res.status(201).send('Updated Successfully'))
    .catch((err) => console.log(err));
};
