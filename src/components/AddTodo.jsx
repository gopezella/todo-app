import React, { Component } from 'react'

const newTodoInput = {
  width: '91%',
  padding: '5px',
  marginRight: '10px'
}

const addStyle = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: '10px',
    padding: '10px 19px',
    verticalAlign: 'middle'
}

export class AddTodo extends Component {
  state = {
    todoDescription: ''
  }

  handleOnChangeInputDescription = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleOnSubmitAddTodo = event => {
    event.preventDefault();
    this.props.addTodo(this.state.todoDescription);
    this.setState({
      todoDescription: ''
    });
  }

  render() {
    const { todoDescription } = this.state;

    return (
      <div style={{margin: '5px'}}>
        <form onSubmit={this.handleOnSubmitAddTodo}>
          <input 
            type="text"
            style={newTodoInput}
            placeholder="Add Todo..."
            name="todoDescription"
            value={todoDescription}
            onChange={this.handleOnChangeInputDescription}
          />
          <input style={addStyle}
            type="submit" 
            value="ADD"
          />
        </form>
      </div>
    )
  }
}

export default AddTodo
