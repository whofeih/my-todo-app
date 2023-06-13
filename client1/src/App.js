import { useState, useEffect, useCallback } from 'react';

import './App.css';
import ToDoForm from './ToDoForm';
import ToDoList from './TodoList';
import DoneList from './DoneList';

function App() {
  const [todoList, setTodoList] = useState(null);
  const [searchKey, setSearchKey] = useState();

  const handleOnSubmit = useCallback(async (task) => {
    /* add API */
      const res = await fetch('/todo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task})
      });
      const savedTask = await res.json();
      setTodoList([...todoList, savedTask]);
      console.log(`Task save: ${savedTask}`);
  }, [todoList]);

  const onUpdate = useCallback(async (task) => {
    /* update API */
    const res = await fetch('/todo', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: task.status,
        id: task._id,
        task: task.task,
      })
    });
    const updatedTodo = await res.json();
    processUpdate(updatedTodo);
  }, [todoList]);

  const processUpdate = (task) => {
    /* Update the stasus of the task in the state */
    setTodoList(todoList.map((todo) => todo._id === task._id ? {...todo, status: task.status} : todo));
  }

  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const ans = window.confirm('Are you sure you want to delete all tasks?');
    if (ans) {
      /* update API */
      const res = await fetch('/clear-tasks', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const count = await res.json();
      setTodoList([]);
    }
  }

  const onSearch = (e) => {
    // filter todo list
    // const filteredList = todoList.filter((todo) => todo.task.includes(e.target.value));
    // setTodoList(filteredList);
    setSearchKey(e.target.value);
  }

  useEffect(() => {
    /* retrieve list of todos on page load */
    fetch(`/todos?search=${searchKey}`)
      .then((res) => res.json())
      .then((data) => setTodoList(data.todos));
  }, [searchKey]);

  /* values can be computed from the list of todos, so don't need state variables for optimization */
  const pendingList = todoList ? todoList.filter((todo) => todo.status === 0) : [];
  const doneList = todoList ? todoList.filter((todo) => todo.status === 1) : [];

  return (
    <div className="todoApp">
      <h2>Marvelous 2.0</h2>
      <a href="" onClick={handleDelete}>Delete all tasks</a>
      <ToDoForm onSubmit={handleOnSubmit} handleOnSearch={onSearch} />
      <section>
        <div className="left">
          <ToDoList todoList={pendingList} onTodoUpdate={onUpdate} />
        </div>
        <div className="right">
          <DoneList todoList={doneList} onTodoUpdate={onUpdate} />
        </div>
      </section>
    </div>
  );
}

export default App;
