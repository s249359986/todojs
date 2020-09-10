import React from "react";

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

class todoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editedTodo: null,
      refs:{}
    }
  }
  handleChange = (item, event) => {
    this.props.handleChange({ item, event })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  removeTodo = (todo) => {
    this.props.removeTodo(todo)
  }
  handleComptetedChange = (event) => {
    this.props.handleComptetedChange(event.target.checked)
  }
  componentDidMount(){
    console.log("componentDidMount")
  }
  handleEditTodo = (item, event) => {
    let count = 0
    return () => {
      count++
      if (count == 2) {
        this.setState({
          editedTodo: item
        })
        setTimeout(()=>{
          this.state.refs[item.id].focus()
        },0)
        count = 0
      }
      setTimeout(() => {
        count = 0
      }, 300)
    }
  }
  doneEdit=(todo)=>{
    let {editedTodo} = this.state
    if (!editedTodo) {
      return;
    }
  }
  editChange(item,event){
    console.log("editChange",item)
    console.log("editChange",event)
    this.props.editChange({item,event})
  }
  handleDoneEdit=(item)=>{
    let {editedTodo} = this.state
    if (!editedTodo) {
      return;
    }
    this.setState({
      editedTodo: null
    })
  }
  render() {
    const list = this.props.todos.map((item, index) => {
      return <li key={index} className={["todo", item.completed ? "completed" : "", item == this.state.editedTodo ? "editing" : ""].join(' ')}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={item.completed}
            onChange={this.handleChange.bind(this, item)}
          />
          <label onClick={this.handleEditTodo(item)}>
            {item.title}
          </label>
          <button className="destroy" onClick={this.removeTodo.bind(this, item)} />
        </div>
        <input
          type="text"
          ref={(input) => { this.state.refs[item.id] = input; }}
          className="edit"
          value={item.title}
          onBlur={ this.handleDoneEdit}
          onKeyUp={this.doneEdit.bind(this,item)}
          onChange={this.editChange.bind(this,item)}
        />
      </li>
    })

    return (
      <section className="main" >
        <input id="toggle-all" className="toggle-all" onChange={this.handleComptetedChange} type="checkbox" />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {list}
        </ul>
      </section>
    );
  }
}
export default todoItem;
