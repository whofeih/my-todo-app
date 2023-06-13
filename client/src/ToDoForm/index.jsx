import {useRef} from 'react';

const ToDoForm = ({onSubmit, handleOnSearch}) => {

  const todoRef = useRef();

  const save = () => {
    if (todoRef.current.value.trim() === '') {
      alert('Todo value is required.');
    } else {
      onSubmit(todoRef.current.value);
      todoRef.current.value = '';
    }
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      save();
    }
  }

  return (
    <div>
      <input type="text" name="todo" id="todo" ref={todoRef} onKeyUp={handleKeyUp} /> <button onClick={save}>Add</button>
      <input type="text" name="search" id="search" placeholder="Search..." onChange={handleOnSearch} />
    </div>
  )
};

export default ToDoForm;