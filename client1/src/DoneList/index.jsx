import { Fragment, useMemo } from "react";

import Todo from "../Todo";

const DoneList = ({todoList, ...props}) => {

  // only show 10 items
  const doneList = useMemo(() => todoList.filter((todo, index) => index < 10 ), [todoList])

  return (
    <>
      <h3>Done</h3>
      <hr />
      <div className="todoList">
        {doneList && doneList.map((todo, index) =>
            <Fragment key={todo._id}><Todo {...{...todo, ...props}} /></Fragment>
          )
        }
        {doneList && doneList.length === 0 && 'Nothing done yet'}
      </div>
    </>
  )
}

export default DoneList;