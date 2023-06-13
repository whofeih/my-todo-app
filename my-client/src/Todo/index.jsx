const Todo = ({onTodoUpdate, ...props}) => {

  const handleOnChange = () => {
    onTodoUpdate({
      ...props,
      status: props.status === 1 ? 0 : 1
  });
  }

  return (
    <div className="todo">
      <label htmlFor={`status-${props._id}`}><input type="checkbox" checked={props.status === 1} onChange={handleOnChange} name="status" id={`status-${props._id}`} /> {props.task}</label>
    </div>
  )

}

export default Todo;