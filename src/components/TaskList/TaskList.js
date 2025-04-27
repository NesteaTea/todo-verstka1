import React from 'react';
import Task from '../Task/Task'
import './TaskList.css'

export default function TaskList({ todos, onToggleCompleted, onEdit, onDelete, onEditClose, editDescription, onStartTimer, onEndTimer }) {
  return (
    <section className="main">
      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <Task
                description={todo.description}
                completed={todo.completed}
                date={todo.date}
                onStartTimer={() => onStartTimer(todo.id)}
                onEndTimer={() => onEndTimer(todo.id)}
                editDescription={(desc) => editDescription(todo.id, desc)}
                onToggleCompleted={() => onToggleCompleted(todo.id)}
                onEdit={() => onEdit(todo.id)}
                onEditing={todo.onEditing}
                onDelete={() => onDelete(todo.id)}
                onEditClose={() => onEditClose(todo.id)}
                totalTime={todo.totalTime}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}