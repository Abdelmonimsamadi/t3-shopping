import { type FormEvent } from "react";
import { trpc } from "../utils/trpc";

function NewTodoForm() {
  const utils = trpc.useContext();
  const { mutate } = trpc.todo.create.useMutation();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const task = evt.currentTarget.task.value;
    mutate(
      { task },
      {
        onSuccess() {
          utils.todo.getAll.invalidate();
        },
      }
    );
  };

  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <label htmlFor="task">New todo</label>
      <input
        // value={userInput.task}
        // onChange={handleChange}
        id="task"
        type="text"
        name="task"
        placeholder="New Todo"
      />
      <button>Add Todo</button>
    </form>
  );
}

export default NewTodoForm;
