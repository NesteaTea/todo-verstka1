import React, { useState } from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import "./TodoApp.css";

export default function TodoApp() {
  const [todos, setTodos] = useState([])
  const [nextId, setNestId] = useState(1)
  const [filter, setFilter] = useState('all')

  const toggleCompleted = (id) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    endTimer(id)

    setTodos(newTodo);
  };

  const deleteTask = (id) => {
    const deleteTask = todos.filter((todo) => todo.id !== id);
    endTimer(id)
    setTodos(deleteTask);
  };

  const editTask = (id) => {
    const newTodo = [...todos];
    newTodo[
      todos.findIndex((todo) => todo.id === id)
    ].onEditing = true;
    setTodos(newTodo);
  };

  const closeEdit = (id) => {
    const newTodo = [...todos];
    newTodo[
      todos.findIndex((todo) => todo.id === id)
    ].onEditing = false;
    setTodos(newTodo);
  };

  const editDescription = (id, desc) => {
    const newTodo = [...todos];

    newTodo[todos.findIndex((todo) => todo.id === id)].description =
      desc;
    setTodos(newTodo);
  };

  const reduceTimer = (id) => {
    const newTodo = [...todos];

    const currentTodo = newTodo[todos.findIndex((todo) => todo.id === id)]

    if (currentTodo.totalTime) {
      currentTodo.totalTime = currentTodo.totalTime - 1
    } else {
      clearInterval(currentTodo.interval)
    }

    setTodos(newTodo);
  }

  const startTimer = (id) => {
    const newTodo = [...todos];

    const currentTodo = newTodo[todos.findIndex((todo) => todo.id === id)]

    if (!currentTodo.completed) {
      currentTodo.interval = setInterval(() => reduceTimer(id), 1000);
      currentTodo.flag = true
    }

    setTodos(newTodo);
  };

  const endTimer = (id) => {
    const newTodo = [...todos];

    const currentTodo = newTodo[todos.findIndex((todo) => todo.id === id)]

    clearInterval(currentTodo.interval);
    currentTodo.flag = false

    setTodos(newTodo);
  };

  const newTask = (todos, newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const deleteAll = (newTodo) => {
    setTodos(newTodo);
  };

  const setNextId = (nextId) => {
    setNestId(nextId + 1);
  };

  const onFilterChange = (filter) => {
    setFilter(filter)
  }
  const filteredTodo = filter === 'active' ? todos.filter((item) => !item.completed) : filter === 'completed' ? todos.filter((item) => item.completed) : todos

  return (
    <section className="todoapp">
      <NewTaskForm
        todos={filteredTodo}
        setTodos={newTask}
        nextId={nextId}
        setNextId={setNextId}
      />
      <TaskList
        todos={filteredTodo}
        onToggleCompleted={toggleCompleted}
        onEdit={editTask}
        onStartTimer={startTimer}
        onEndTimer={endTimer}
        onDelete={deleteTask}
        onEditClose={closeEdit}
        editDescription={editDescription}
      />
      <Footer
        todos={filteredTodo}
        setTodos={newTask}
        deleteAll={deleteAll}
        onFilterChange={onFilterChange}
        filter={filter}
      />
    </section>
  );
}