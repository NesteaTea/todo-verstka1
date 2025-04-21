import React, { Component } from 'react';
import "./TasksFilter.css";
import PropTypes from 'prop-types';

export default class TasksFilter extends Component {
  buttonsData = [
    {
      name: "all",
      label: "All",
    },
    {
      name: "active",
      label: "Active",
    },
    {
      name: "completed",
      label: "Completed",
    },
  ];

  render() {
    const buttons = this.buttonsData.map(({ name, label }) => {
      const clazz = this.props.filter === name ? "selected" : null;
      return (
        <li key={name}>
          <button
            className={clazz}
            onClick={() => this.props.onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }
}

TasksFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func
}