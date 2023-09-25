import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { ApiService } from "./services/api.service.js";

const App = () => {
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(null);
  const onChange = (e) => {
    console.log(name);
    setName(e.target.value);
  };

  const addTodo = () => {
    if (!name) {
      return;
    }

    ApiService.createData("api/Home", {
      name: name,
      isDone: false,
    })
      .then((res) => {
        setTodos([...todos, res]);
        setName("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTodo = (id) => {
    ApiService.deletedData("api/Home", id)
      .then((res) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editTodo = (id) => {
    const newTodo = todos.filter((todo) => todo.id === id);
    setEdit(id);
    setName(newTodo[0].name);
  };
  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await ApiService.getData("api/Home");
      setTodos(data.data);
    };

    getData();
  }, [todos]);
  return (
    <div className="App">
      <h1> Todo ListGroup</h1>
      <div className="input-wrapper">
        <input
          type="text"
          name="todo"
          placeholder="Create a new todo"
          onChange={onChange}
          value={name}
        />
        <button
          className="add-button"
          onClick={async () => {
            if (edit) {
              const data = await ApiService.updateData("api/Home", edit, {
                name: name,
              });

              setTodos([...todos, data]);
              setEdit(null);
              setName("");
            } else {
              return addTodo();
            }
          }}
        >
          Add
        </button>
      </div>
      {todos?.length > 0 ? (
        <ul className="todo-list">
          {todos.map((todo, index) => (
            <div className="todo" key={index}>
              <li key={index}>
                {todo.isDone ? (
                  <strike>
                    {todo.id}-{todo.name}
                  </strike>
                ) : (
                  <>
                    {todo.id}- {todo.name}
                  </>
                )}
              </li>
              <button
                className="underline-button"
                onClick={() => toggleTodo(todo.id)}
              >
                No Empty
              </button>
              <button className="edit-button" onClick={() => editTodo(todo.id)}>
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>No Task Found</p>
        </div>
      )}
    </div>
  );
};

export default App;
