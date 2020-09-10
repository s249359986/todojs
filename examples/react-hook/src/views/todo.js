import React, { useState } from "react";
import '../App.css';
import Footer from '../components/footer';
import TodoItem from '../components/todoItem';

const filters = {
  all: function (todos) {
    return todos;
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
}

const MAX_INPUT = 10
var STORAGE_KEY = "todos-reactjs-2.0";
let todoStorage = {
  uid:1,
  fetch: function () {
    let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
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

// class Todo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { todos: todoStorage.fetch() || [], visibility: 'all' };
//   }
//   handleChange = (event) => {
//     this.setState({ value: event.target.value })
//   }
//   componentDidUpdate = (prevProps,prevState)=>{
//   }
//   removeTodo = (todo) => {
//     console.log("removeTodo", todo)
//     let { todos } = this.state
//     todos.splice(todos.indexOf(todo), 1);
//     this.setState({
//       todos: todos
//     })
//     todoStorage.save(todos)
//   }
//   handleTodoState = (item) => {
//     console.log("handleTodoState", item)
//     this.setState({
//       visibility: item
//     })
//   }
//   todeChangeChecked = (obj) => {
//     let { todos } = this.state
//     todos[todos.indexOf(obj['item'])]['completed'] = obj.event.target.checked
//     console.log("todeChangeChecked", obj)
//     this.setState({
//       todos: todos
//     })
//     todoStorage.save(todos)
//   }
//   get filterTodos() {
//     let { visibility, todos } = this.state
//     return filters[visibility](todos)
//   }
//   addTodo = (e) => {
//     let key = e.key.toLowerCase()
//     if (key == 'enter') {
//       let { value, todos } = this.state
//       let tempValue = value && value.trim();
//       if (!tempValue) {
//         return;
//       }
//       todos.push({
//         id: todoStorage.uid++,
//         title: tempValue,
//         completed: false
//       });
//       this.setState({
//         value: "",
//         todos: todos
//       })
//       todoStorage.save(todos)
//     }
//   }
//   onClearCompleted=()=>{
//     this.setState({
//       todos:filters.active(this.state.todos)
//     })
//   }
//   handleComptetedChange=(value)=>{
//     let { todos } = this.state
//     let tempTodos = todos.map((todo)=> {
//       todo['completed'] = value
//       return todo
//     })
//     this.setState({
//       todos:tempTodos
//     })
//   }
//   editChange=(obj)=>{
//     let { todos } = this.state
//     let tempTodos = todos.map((todo)=> {
//       if(todo['id'] == obj['item']['id']){
//         todo['title'] = obj['event']['target']['value']
//       }
//       return todo
//     })
//     this.setState({
//       todos:tempTodos
//     })
//     todoStorage.save(tempTodos)
//   }
//   render() {
//     const { todos } = this.state
//     return (
//       <div className="App">
//         <section className="todoapp">
//           <header className="header">
//             <h1>备忘录</h1>
//             <input
//               onChange={this.handleChange}
//               onKeyUp={this.addTodo}
//               autoFocus
//               autoComplete="off"
//               className="new-todo"
//               placeholder="需要做什么?"
//               value={this.state.value}
//             />
//           </header>
//           <TodoItem editChange={this.editChange} handleComptetedChange={this.handleComptetedChange} handleChange={this.todeChangeChecked.bind(this)} removeTodo={this.removeTodo.bind(this)} todos={this.filterTodos} />
//         </section>
//         <Footer onClearCompleted={this.onClearCompleted} completedCount={filters.completed(this.state.todos).length} count={this.filterTodos.length} handleTodoState={this.handleTodoState.bind(this)} />
//       </div >
//     );
//   }
// }


function Todo(props){
  const [value, setValue] = useState(0)
  const [todos, setTodos] = useState([])
  const [visibility, setVisibility] = useState('all')
  const handleChange = (event) => {
    setValue(event.target.value)
  }
  const  addTodo = (e) => {
    let key = e.key.toLowerCase()
    if (key == 'enter') {
      let tempValue = value && value.trim();
      if (!tempValue) {
        return;
      }
      todos.push({
        id: todoStorage.uid++,
        title: tempValue,
        completed: false
      });
      setValue("")
      setTodos(todos)
      todoStorage.save(todos)
    }
  }
  const editChange=(obj)=>{
    let { todos } = this.state
    let tempTodos = todos.map((todo)=> {
      if(todo['id'] == obj['item']['id']){
        todo['title'] = obj['event']['target']['value']
      }
      return todo
    })
    this.setState({
      todos:tempTodos
    })
    todoStorage.save(tempTodos)
  }

  const  handleComptetedChange=(value)=>{
    let { todos } = this.state
    let tempTodos = todos.map((todo)=> {
      todo['completed'] = value
      return todo
    })
    this.setState({
      todos:tempTodos
    })
  }

  const  todeChangeChecked = (obj) => {

    todos[todos.indexOf(obj['item'])]['completed'] = obj.event.target.checked
    console.log("todeChangeChecked", obj)
    setTodos(todos)
    todoStorage.save(todos)
  }
  const  removeTodo = (todo) => {
    console.log("removeTodo", todo)
    todos.splice(todos.indexOf(todo), 1);
    setTodos(todos)
    todoStorage.save(todos)
  }
  const  filterTodos=()=> {
    return filters[visibility](todos)
  }


  return (
      <div className="App">
        <section className="todoapp">
          <header className="header">
            <h1>备忘录</h1>
            <input
              onChange={handleChange}
              onKeyUp={addTodo}
              autoFocus
              autoComplete="off"
              className="new-todo"
              placeholder="需要做什么?"
              value={value}
            />
          </header>
          <TodoItem editChange={editChange} handleComptetedChange={handleComptetedChange} handleChange={todeChangeChecked} removeTodo={removeTodo} todos={filterTodos()} />
        </section>
        {/* <Footer onClearCompleted={this.onClearCompleted} completedCount={filters.completed(this.state.todos).length} count={this.filterTodos.length} handleTodoState={this.handleTodoState.bind(this)} /> */}
      </div >
    )

}




export default Todo;
