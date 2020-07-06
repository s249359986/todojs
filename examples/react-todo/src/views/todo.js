import React from "react";
import logo from '../logo.svg';
import '../App.css';
import Footer from '../components/footer';
import { app } from '../tools/index';
import TodoItem from '../components/todoItem';

const MAX_INPUT = 10
var STORAGE_KEY = "todos-reactjs-2.0";
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function (todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: []};
  }
  handleChange = (event)=>{
    this.setState({value: event.target.value})
  }
  addTodo = (e)=> {
    let key = e.key.toLowerCase()
    if(key == 'enter'){
      let { value, todos } = this.state
      let tempValue = value && value.trim();
      if (!tempValue) {
        return;
      }
      todos.push({
        id: todoStorage.uid++,
        title: tempValue,
        completed: false
      });
      this.setState({
        value: "",
        todos: todos
      })
    }

  }
  render() {
    const {todos} = this.state
    return (
      <div className="App">
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
            onChange = {this.handleChange}
            onKeyUp={this.addTodo}
              autoFocus
              autoComplete="off"
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.value}
            />
          </header>
          <TodoItem todos={todos} />
        </section>
        <Footer />
      </div >
    );
  }

}

export default Todo;
