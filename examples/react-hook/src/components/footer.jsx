import React from "react";
import {app, classNames} from '../tools/index';

class todoFooter extends React.Component {
  constructor(props) {
    super(props);
  }
  handleTodoState=(item)=>{
    this.props.handleTodoState(item)
  }
  render() {
    var activeTodoWord = app.Utils.pluralize(this.props.count, 'item');
    var clearButton = null;

    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClearCompleted}>
          Clear completed
        </button>
      );
    }
    var nowShowing = this.props.nowShowing;
    let liList = ['all','active','completed'].map((item,index)=>{
      return <li key={index}>
            <a
              onClick={this.handleTodoState.bind(this,item)}
              className={classNames({ selected: nowShowing === app.ALL_TODOS })}>
              {item}
          </a>
          </li>
    })
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
      </span>
        <ul className="filters">
         {liList}
        </ul>
        {clearButton}
      </footer>
    );
  }
}

export default todoFooter;
