import React, { Component } from "react";
import NewTaskForm from "../NewTaskForm/NewTaskForm";
import TaskList from "../TaskList/TaskList";
import Footer from "../Footer/Footer";
import "./TodoApp.css";

export default class TodoApp extends Component {
  state = {
    todos: [],
    nextId: 1,
    filter: 'all'
  };

  toggleCompleted = (id) => {
    const newTodo = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.endTimer(id)

    this.setState({ todos: newTodo });
  };

  deleteTask = (id) => {
    const deleteTask = this.state.todos.filter((todo) => todo.id !== id);
    this.endTimer(id)
    this.setState({ todos: deleteTask });
  };

  editTask = (id) => {
    const newTodo = [...this.state.todos];
    newTodo[
      this.state.todos.findIndex((todo) => todo.id === id)
    ].onEditing = true;
    this.setState({ todos: newTodo });
  };

  closeEdit = (id) => {
    const newTodo = [...this.state.todos];
    newTodo[
      this.state.todos.findIndex((todo) => todo.id === id)
    ].onEditing = false;
    this.setState({ todos: newTodo });
  };

  editDescription = (id, desc) => {
    const newTodo = [...this.state.todos];

    newTodo[this.state.todos.findIndex((todo) => todo.id === id)].description =
      desc;
    this.setState({ todos: newTodo });
  };

  reduceTimer = (id) => {
    const newTodo = [...this.state.todos];

    const currentTodo = newTodo[this.state.todos.findIndex((todo) => todo.id === id)]

    if(currentTodo.totalTime) {
      currentTodo.totalTime = currentTodo.totalTime - 1
    } else {
      clearInterval(currentTodo.interval)
    }

    this.setState({ todos: newTodo });
  }

  startTimer = (id) => {
    const newTodo = [...this.state.todos];

    const currentTodo = newTodo[this.state.todos.findIndex((todo) => todo.id === id)]

    if(!currentTodo.flag) {
      currentTodo.interval = setInterval(() => this.reduceTimer(id), 1000);
      currentTodo.flag = true
    }

    this.setState({ todos: newTodo });
  };

  endTimer = (id) => {
    const newTodo = [...this.state.todos];

    const currentTodo = newTodo[this.state.todos.findIndex((todo) => todo.id === id)]

    clearInterval(currentTodo.interval);
    currentTodo.flag = false

    this.setState({ todos: newTodo });
  };

  setTodos = (todos, newTodo) => {
    this.setState({ todos: [...todos, newTodo] });
  };

  deleteAll = (newTodo) => {
    this.setState({ todos: newTodo });
  };

  setNextId = (nextId) => {
    this.setState({ nextId: nextId + 1 });
  };

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  render() {
    const { todos, nextId } = this.state;
    const filteredTodo = this.state.filter === 'active' ? todos.filter((item) => !item.completed) : this.state.filter === 'completed' ? todos.filter((item) => item.completed) : todos

    return (
      <section className="todoapp">
        <NewTaskForm
          todos={filteredTodo}
          setTodos={this.setTodos}
          nextId={nextId}
          setNextId={this.setNextId}
        />
        <TaskList
          todos={filteredTodo}
          onToggleCompleted={this.toggleCompleted}
          onEdit={this.editTask}
          onStartTimer={this.startTimer}
          onEndTimer={this.endTimer}
          onDelete={this.deleteTask}
          onEditClose={this.closeEdit}
          editDescription={this.editDescription}
        />
        <Footer
          todos={filteredTodo}
          setTodos={this.setTodos}
          deleteAll={this.deleteAll}
          onFilterChange={this.onFilterChange}
          filter={this.state.filter}
        />
      </section>
    );
  }
}
