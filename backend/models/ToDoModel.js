import mongoose from 'mongoose';

const { model } = mongoose;

export default model('Task', {
  task: {
    type: String,
    required: true,
    unique: true,
  },
});
