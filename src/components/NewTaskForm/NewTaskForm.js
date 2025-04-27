import React, { useState } from 'react';
import "./NewTaskForm.css";

export default function NewTaskForm({
  todos, nextId, setTodos, setNextId
}) {
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onChangeMinutes = (e) => {
    setMinutes(e.target.value)
  }

  const onChangeSeconds = (e) => {
    if (e.target.value.length > 2 || Number(e.target.value) > 59) {
      setSeconds('')
    } else {
      setSeconds(e.target.value);
    }
  }

  const newTaskDescriptionText = (ev) => {
    setNewTaskDescription(ev.target.value);
  };

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
      if (newTaskDescription.trim() !== "") {
        const newTodo = {
          id: nextId,
          description: newTaskDescription,
          completed: false,
          onEditing: false,
          date: new Date(),
          totalTime: minutes * 60 + +seconds,
          interval: null,
          flag: false
        };
        setTodos(todos, newTodo);
        setNextId(nextId);
        setNewTaskDescription('');
        setMinutes('');
        setSeconds('');
      }
    }
  };

  return (
    <header>
      <h1>Todos</h1>
      <form className="new-todo-form">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          type="text"
          value={newTaskDescription}
          onChange={newTaskDescriptionText}
          onKeyDown={handleKeyDown}
        />
        <input className="new-todo-form__timer" placeholder="Min" value={minutes} onChange={onChangeMinutes} />
        <input className="new-todo-form__timer" placeholder="Sec" value={seconds} onChange={onChangeSeconds} />
      </form>
    </header>
  );
}