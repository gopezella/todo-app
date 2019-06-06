import React, { Component } from 'react'

const todoItemDivStyle = {
  border: '1px solid black',
  margin: '5px',
  padding: '5px'
}

const completeCheckboxStyle = {
  marginRight: '7px'
}

const deleteButtonStyle = {
  float: 'right',
  borderRadius: '50%',
  border: 'none',
  padding: '3px 7px',
  cursor: 'pointer'
}

export class TodoItem extends Component {
  getDescriptionStyle = completed => {
    return {
      textDecoration: completed ? 'line-through' : 'none'
    }
  }

  render() {
    const { todo, toggleCompleteTodo, deleteTodo } = this.props;
    return (
      <div style={todoItemDivStyle}>
        <input 
          type="checkbox"
          style={completeCheckboxStyle}
          value={todo.completed}
          defaultChecked={todo.completed}
          onClick={toggleCompleteTodo.bind(this, todo)} 
        />
        {/* <span 
          style={this.getDescriptionStyle(todo.completed)}>
          {todo.description}
        </span>
        <button 
          style={deleteButtonStyle}
          title="Delete Todo"
          onClick={deleteTodo.bind(this, todo)}>
          x
        </button> */}
      </div>
    );
  }
}

export default TodoItem
