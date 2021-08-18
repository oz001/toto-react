import { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onClickAdd = () => {
    let newIncompleteTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newIncompleteTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newIncomplete = [...incompleteTodos];
    newIncomplete.splice(index, 1);
    setIncompleteTodos(newIncomplete);
  };
  const onClickComplete = (index) => {
    const newIncomplete = [...incompleteTodos];
    newIncomplete.splice(index, 1);
    const newComplete = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncomplete);
    setCompleteTodos(newComplete);
  };
  const onClickBack = (index) => {
    const newComplete = [...completeTodos];
    const taskName = newComplete[index];
    newComplete.splice(index, 1);
    setCompleteTodos(newComplete);
    const newIncomplete = [...incompleteTodos, taskName];
    setIncompleteTodos(newIncomplete);
  };

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録出来るtodo5個まで</p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
