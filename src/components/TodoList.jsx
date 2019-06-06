import React, { Component } from 'react'
import AddTodo from './AddTodo'
// import TodoItem from './TodoItem'
import axios from 'axios'
import { TODOS_REST_API_URL } from '../constants'
import Header from './Header'
import { MDBDataTable } from 'mdbreact';
import ModalUpdate from './ModalUpdate.js'
import './TodoListStyle.css'

const todoListDivStyle = {
  width: '55%',
  margin: '0 auto'
}

export class TodoList extends Component {

  constructor(props){
    super(props);
    this.state = {
      columns: [
        {
          label: 'Description',
          field: 'description',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Created By',
          field: 'createdBy',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Created At',
          field: 'createdDate',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Updated At',
          field: 'updatedAt',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Action',
          field: 'action',
        }
        
      ],
      rows: [],
      showUpdate: false,
      id: 0,
      index: 0
    }
  }
  

  handleShowUpdate(id, index) {
    console.log(id)
    this.setState({
       showUpdate: true,
       id: id,
       index: index
    });
  }

  handleCloseUpdate(id) {
    this.setState({ 
      showUpdate: false,
      id: id
    });
  }

  // handleUpdateTodo() {
  //   this.setState({ 
  //     showUpdate: false 
  //   });

  // }

  componentDidMount = () => {
    this.fetchTodos();
    this.removeDataTableElements();
  }

  fetchTodos = () => {
    axios.get(TODOS_REST_API_URL)
      .then(response => {
       
        const todos = response.data.map((todo, index) => {
            return {
              description: todo.description,
              createdBy: todo.createdBy,
              createdDate: todo.createdDate,
              updatedDate: todo.lastModifiedDate,
              action: [
                <button onClick={() => this.handleShowUpdate(todo.id, index)}>EDIT</button>,
                <button onClick={() => this.deleteTodo(todo.id)}>DELETE</button>,
                // {/* <TodoItem 
                //   key={todo.id} 
                //   todo={todo}
                //   toggleCompleteTodo={this.toggleCompleteTodo}
                //   deleteTodo={this.deleteTodo} 
                // /> */}
              ]
            }
        })
        this.setState({
          rows: todos
        })
      });
  }

  toggleCompleteTodo = todo => {
    todo.completed = !todo.completed;
    axios.put(`${TODOS_REST_API_URL}/${todo.id}`, 
      todo
    ).then(response => {
      const updatedTodo = response.data;
      this.setState({
        todos: this.state.todos.map(todo => {
          if (todo.id === updatedTodo.id) {
            todo = updatedTodo;
          }
          return todo;
        })
      })

    }).catch(error => {
      console.log(error.response.data);
    })
  }


  deleteTodo = todo => {
    axios.delete(`${TODOS_REST_API_URL}/${todo}`)
      .then(response => {
        this.fetchTodos();
      }).catch(error => {
        console.log(error.response);
      })
  }

  addTodo = todoDescription => {
    axios.post(TODOS_REST_API_URL, {
      description: todoDescription
    }).then(response => {
      this.fetchTodos();
    }).catch(error => {
      console.log(error.response);
    })
  }

  removeDataTableElements = () => {
    document.getElementsByClassName('dataTable')[0].children[2].remove();
  }

  editTodo = (description) => {
    console.log(description);
      axios.put(TODOS_REST_API_URL + '/' + this.state.id, {
          "description": description
      }).then(response => {
        this.setState({ showUpdate: false });
        this.fetchTodos();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Header />
          <div style={todoListDivStyle}>
            <AddTodo addTodo={this.addTodo}/>
            <ModalUpdate 
              showUpdate={this.state.showUpdate}
              handleCloseUpdate ={this.handleCloseUpdate.bind(this)}
              handleUpdateTodo = {this.editTodo}
              index={this.state.index}
              data={this.state.rows[this.state.index]}
            />
            <MDBDataTable 
              data={this.state}
              fixed={true}
              hover={true}
              bordered={true}
              />
            {/* <div>
                {this.state.rows.map(todo => (
                <TodoItem 
                  key={todo.id} 
                  todo={todo}
                  toggleCompleteTodo={this.toggleCompleteTodo}
                  deleteTodo={this.deleteTodo} 
                />
              ))}
              </div> */}
          </div>
      </div> 
    );
  }
}

export default TodoList
