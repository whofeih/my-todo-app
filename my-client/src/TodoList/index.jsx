import { Fragment, useEffect } from "react";

import Todo from "../Todo";

const ToDoList = ({todoList, ...props}) => {

  return (
    <div>
      <h3>To Do</h3>
      <hr />
      <div className="todoList">
        {todoList && todoList.map((todo, index) =>
            <Fragment key={todo._id}><Todo {...{...todo, ...props}} /></Fragment>
          )
        }
        {todoList && todoList.length === 0 && 'Nothing to do yet'}
      </div>
    </div>
  )
}

export default ToDoList;