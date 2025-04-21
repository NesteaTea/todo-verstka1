import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task'
import './TaskList.css'

export default class TaskList extends Component {
  render() {
    const { todos, onToggleCompleted, onEdit, onDelete, onEditClose, editDescription, onStartTimer, onEndTimer } = this.props

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
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      onEditing: PropTypes.bool.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      minutes: PropTypes.number,
      seconds: PropTypes.number
    })
  ),
  onToggleCompleted: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onEditClose: PropTypes.func,
  editDescription: PropTypes.func
}
