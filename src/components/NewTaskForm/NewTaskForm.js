import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./NewTaskForm.css";

export default class NewTaskForm extends Component {
  state = {
    newTaskDescription: "",
    minutes: "",
    seconds: ""
  };

  onChangeMinutes = (e) => {
    this.setState({
      minutes: e.target.value
    })
  }

  onChangeSeconds = (e) => {
    if(e.target.value.length > 2 || Number(e.target.value) > 59){
      this.setState({
        seconds: ''
    })} else {
      this.setState({
        seconds: e.target.value,
      });
    }
  }

  newTaskDescriptionText = (ev) => {
    this.setState({ newTaskDescription: ev.target.value });
  };

  handleKeyDown = (event) => {
    const { todos, nextId, setTodos, setNextId } = this.props;
    const { newTaskDescription, minutes, seconds } = this.state;

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
        this.setState({ 
          newTaskDescription: "",
          minutes: "",
          seconds: ""
        });
      }
    }
  };

  render() {
    return (
      <header>
        <h1>Todos</h1>
        <form className="new-todo-form">
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            type="text"
            value={this.state.newTaskDescription}
            onChange={this.newTaskDescriptionText}
            onKeyDown={this.handleKeyDown}
          />
          <input className="new-todo-form__timer" placeholder="Min" value={this.state.minutes} onChange={this.onChangeMinutes} />
          <input className="new-todo-form__timer" placeholder="Sec" value={this.state.seconds} onChange={this.onChangeSeconds} />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
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
  nextId: PropTypes.number.isRequired,
  setTodos: PropTypes.func,
  setNextId: PropTypes.func
}