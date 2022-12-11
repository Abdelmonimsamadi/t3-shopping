import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { type Todo } from "@prisma/client";
import { type FormEvent, useState } from "react";
import { trpc } from "../utils/trpc";

function Todo({ todo }: { todo: Todo }) {
  const utils = trpc.useContext();
  const { mutate: deleteTodo } = trpc.todo.delete.useMutation();
  const { mutate: updateTodo } = trpc.todo.update.useMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    deleteTodo(
      { id: todo.id },
      {
        onSuccess() {
          utils.todo.getAll.invalidate();
        },
      }
    );
  };
  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };
  const handleUpdate = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const task = evt.currentTarget.task.value;
    updateTodo(
      { id: todo.id, todo: { task } },
      {
        onSuccess() {
          utils.todo.getAll.invalidate();
        },
      }
    );
    toggleFrom();
  };

  const toggleCompleted = () => {
    updateTodo(
      { id: todo.id, todo: { completed: !todo.completed } },
      {
        onSuccess() {
          utils.todo.getAll.invalidate();
        },
      }
    );
  };

  let result;
  if (isEditing) {
    result = (
      <div className="Todo">
        <form className="Todo-edit-form" onSubmit={handleUpdate}>
          <input type="text" defaultValue={todo.task} name="task" />
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className="Todo">
        <li
          id={todo.id}
          onClick={toggleCompleted}
          className={todo.completed ? "Todo-task completed" : "Todo-task"}
        >
          {todo.task}
        </li>
        <div className="Todo-buttons">
          {/* <button onClick={toggleFrom}> */}
          <FontAwesomeIcon
            icon={faPen}
            className="icons"
            onClick={toggleFrom}
          />
          {/* </button> */}
          {/* <button onClick={handleClick}> */}
          <FontAwesomeIcon
            icon={faTrash}
            id={todo.id}
            className="icons"
            onClick={handleClick}
          />
          {/* </button> */}
        </div>
      </div>
    );
  }
  return result;
}

export default Todo;
