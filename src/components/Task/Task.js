import React, { Component } from 'react';
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";
import "./Task.css";

export default class Task extends Component {
  state = {
    value: this.props.description,
    interval: null
  }

  toggleCompleted = () => {
    this.props.onToggleCompleted();
  };

  onLabelEditing = (event) => {
    this.setState({ value: event.target.value })
  }

  closeEdit = (event) => {
    if (event.key === 'Escape') {
      this.props.onEditClose()
      this.setState({ value: this.props.description })
    } else if (event.key === 'Enter') {
      this.props.editDescription(this.state.value)
      this.props.onEditClose()
    }
  }

  render() {
    const {
      completed,
      description,
      date,
      onEdit,
      onEditing,
      onDelete,
      onStartTimer,
      onEndTimer,
      totalTime
    } = this.props;

    const minutes = Math.trunc(totalTime / 60)  
    let seconds = totalTime % 60

    if(seconds < 10) {
      seconds = `0${seconds}`
    } else {
      seconds = totalTime % 60
    }

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={this.toggleCompleted}
        />
        <button
          id='task'
          className={`${completed ? "completed" : ""}`}
        >
          <span className="description" onClick={this.toggleCompleted}>{description}</span>
          <div className="wrapper-button-play">
            <span className="icon-play" onClick={onStartTimer}></span>
            <span className="icon-pause" onClick={onEndTimer}></span>
            <p>{minutes.length !== 0 ? minutes : '00'}:{seconds.length !== 0 ? seconds : '00'}</p>
          </div>
          <span className="created">
            {formatDistanceToNow(date, {
              addSuffix: true,
              locale: ruLocale,
              includeSeconds: true,
            })}
          </span>
        </button>
        <button className="icon icon-edit" onClick={onEdit}></button>
        <button className="icon icon-destroy" onClick={onDelete}></button>
        {onEditing ? <input type='text' onKeyDown={this.closeEdit} onChange={this.onLabelEditing} value={this.state.value} className='edit' /> : null}
      </div>

    );
  }
}