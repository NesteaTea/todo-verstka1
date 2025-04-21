import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import TasksFilter from '../TasksFilter/TasksFilter';

export default class Footer extends Component {
  deleteAll = () => {
    const { todos } = this.props
    const deleteAll = todos.filter((todo) => { if(todo.completed) { clearInterval(todo.interval) }; return !todo.completed })
    this.props.deleteAll(deleteAll);
  }

  render() {
    const { todos, onFilterChange, filter } = this.props
    const todosCount = todos.filter((todo) => !todo.completed).length;

    return (
      <footer className="footer">
        <span className="todo-count">{`${todosCount} items left`}</span>
        <TasksFilter onFilterChange={onFilterChange} filter={filter} />
        <button className="clear-completed" onClick={this.deleteAll}>Clear completed</button>
      </footer>
    )
  }
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      onEditing: PropTypes.bool.isRequired,
      date: PropTypes.instanceOf(Date).isRequired
    })
  ),
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func,
  deleteAll: PropTypes.func,
  setTodos: PropTypes.func
}

Footer.defaultProps = {
  completed: false,
  onEditing: false,
  onFilterChange: () => { },
  deleteAll: () => { },
  setTodos: () => { }
}
