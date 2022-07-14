import './App.css';
import { useState, useEffect } from 'react';
import Item from './components/Item.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

function App() {
  const [text, setText] = useState('');
  const [todo, setTodo] = useState([]);
  const [isUpdating, setUpdating] = useState('');
  const [newTaskSubmit, setnewTaskSubmit] = useState('');
  const [toDoListEmpty, setToDoListEmpty] = useState(false);

  const fetchTodo = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/todo`
    );
    setTodo(data);
  };

  useEffect(() => {
    fetchTodo();
  }, [newTaskSubmit]);

  useEffect(() => {
    {
      todo.length === 0 ? setToDoListEmpty(true) : setToDoListEmpty(false);
    }
    // if (todo.length === 0) {
    //   setToDoListEmpty(true);
    // } else {
    //   setToDoListEmpty(false);
    // }
  }, [todo]);

  const duplicateChecking = (arr) => {
    const duplicate = arr.filter(
      (task) => task.task.toLowerCase() === text.toLowerCase()
    );
    if (duplicate.length !== 0) {
      console.log('Duplicate found');
      console.log(duplicate);
      toast.error('Task Already Exist');
      return true;
    }
    return false;
  };

  const addUpdate = (e) => {
    e.preventDefault();
    console.log(text);
    if (duplicateChecking(todo)) return;
    if (isUpdating === '') {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/todo`, { task: text })
        .then((res) => {
          setnewTaskSubmit(text);
          console.log(res.data);
        });
    } else {
      if (duplicateChecking(todo)) return;

      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/todo/${isUpdating}`, {
          _id: isUpdating,
          task: text,
        })
        .then((res) => {
          console.log(res.data);
          toast.success('Updated Task');
          setText('');
          setUpdating('');
          setnewTaskSubmit(text);
        })
        .catch((err) => console.log(err));

      console.log(todo);
    }
  };

  const deleteToDo = (_id) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/todo/${_id}`)
      .then((res) => {
        console.log(res.data);
        fetchTodo();
      })
      .catch((err) => console.log(err));
  };

  const updateToDo = (_id, text) => {
    setUpdating(_id);
    setText(text);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>

        <div className="top">
          <form onSubmit={addUpdate} className="form">
            <input
              type="text"
              placeholder="Write Something..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                console.log(e.target.value);
              }}
            />
            <button type="submit" className="add">
              {isUpdating ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
        {toDoListEmpty ? (
          <div className="image">
            <img src="./src/images/Add tasks-pana.png" alt="" />
          </div>
        ) : (
          <div className="list">
            {todo.map((item) => (
              <Item
                key={item._id}
                task={item.task}
                remove={() => deleteToDo(item._id)}
                update={() => updateToDo(item._id, item.task)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
