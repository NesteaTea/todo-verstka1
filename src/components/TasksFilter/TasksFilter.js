import React from 'react';
import "./TasksFilter.css";

export default function TasksFilter({ onFilterChange, filter }) {
  const buttonsData = [
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

    const buttons = buttonsData.map(({ name, label }) => {
      const clazz = filter === name ? "selected" : null;
      return (
        <li key={name}>
          <button
            className={clazz}
            onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });
    return <ul className="filters">{buttons}</ul>;
  }