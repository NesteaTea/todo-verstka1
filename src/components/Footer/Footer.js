import React from 'react';
import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';

export default function Footer({ todos, onFilterChange, filter, deleteAll }) {
  const clearCompleted = () => {
    const filteredDeleteCompleted = todos.filter((todo) => { if(todo.completed) { clearInterval(todo.interval) }; return !todo.completed })
    deleteAll(filteredDeleteCompleted);
  }

    const todosCount = todos.filter((todo) => !todo.completed).length;

    return (
      <footer className="footer">
        <span className="todo-count">{`${todosCount} items left`}</span>
        <TasksFilter onFilterChange={onFilterChange} filter={filter} />
        <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
      </footer>
    )
  }