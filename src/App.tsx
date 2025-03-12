import React, { useRef, useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<string>("all");

  const handleAddTodo = () => {
    if (!inputRef.current?.value.trim()) return;

    const randomId = Math.floor(Math.random() * 1000) + new Date().getTime();
    setTodoList([
      ...todoList,
      {
        id: randomId,
        text: inputRef.current.value,
        done: false,
      },
    ]);

    inputRef.current.value = "";
  };

  const handleDone = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleClear = () => {
    setTodoList((prev) => prev.filter((todo) => !todo.done));
  };

  const handleFilter = (filter: string) => {
    setFilter(filter);
  };

  const filteredTodoList = todoList.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return todo;
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">TODO</h1>
      </header>
      <main>
        <div className="todo_wrap">
          <div>
            <input
              ref={inputRef}
              id="todo"
              placeholder="add todo"
              type="text"
            />
            <button onClick={handleAddTodo}>ADD</button>
          </div>

          <ul className="todo_list">
            {filteredTodoList.map((todo) => (
              <li
                key={todo.id}
                className="todo_item"
                onClick={() => handleDone(todo.id)}
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => handleDone(todo.id)}
                />

                <span className={todo.done ? "done" : ""}>{todo.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer className="App-footer">
        <span>{todoList.filter((todo) => !todo.done).length} items left</span>
        <div className="btns">
          <button onClick={() => handleFilter("all")}>All</button>
          <button onClick={() => handleFilter("active")}>Active</button>
          <button onClick={() => handleFilter("completed")}>Completed</button>
        </div>

        <button onClick={handleClear}>Clear Completed</button>
      </footer>
    </div>
  );
}

export default App;
