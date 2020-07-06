
import React from "react";
import {app, classNames} from '../tools/index';
import {
  BrowserRouter as Router
} from "react-router-dom";
import TodoItem from './todoItem';

	var TodoFooter = app.TodoFooter;
	// var TodoItem = app.TodoItem;
	var ENTER_KEY = 13;
	class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {newTodo:''}
      // this.state = {isToggleOn: true};
      // return { editText: this.props.todo.title };
      // this.state = { editText: props.todo.title }
      // 为了在回调中使用 `this`，这个绑定是必不可少的
      // this.handleClick = this.handleClick.bind(this);
    }
		// getInitialState: function () {
		// 	return {
		// 		nowShowing: app.ALL_TODOS,
		// 		editing: null,
		// 		newTodo: ''
		// 	};
		// },
		componentDidMount () {
			// var setState = this.setState;
			// var router = Router({
			// 	'/': setState.bind(this, {nowShowing: app.ALL_TODOS}),
			// 	'/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
			// 	'/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
			// });
			// router.init('/');
		}
		handleChange (event) {
			// this.setState({newTodo: event.target.value});
		}

		handleNewTodoKeyDown (event) {
			// if (event.keyCode !== ENTER_KEY) {
			// 	return;
			// }
			// event.preventDefault();

			// var val = this.state.newTodo.trim();

			// if (val) {
			// 	this.props.model.addTodo(val);
			// 	this.setState({newTodo: ''});
			// }
		}

		toggleAll (event) {
			// var checked = event.target.checked;
			// this.props.model.toggleAll(checked);
		}

		toggle (todoToToggle) {
			// this.props.model.toggle(todoToToggle);
		}
		destroy (todo) {
			// this.props.model.destroy(todo);
		}
		edit (todo) {
			// this.setState({editing: todo.id});
		}
		save (todoToSave, text) {
			// this.props.model.save(todoToSave, text);
			// this.setState({editing: null});
		}
		cancel () {
			// this.setState({editing: null});
		}
		clearCompleted () {
			// this.props.model.clearCompleted();
		}
		render () {
			// var footer;
			// var main;
			// var todos = this.props.model.todos;
			// var shownTodos = todos.filter(function (todo) {
			// 	switch (this.state.nowShowing) {
			// 	case app.ACTIVE_TODOS:
			// 		return !todo.completed;
			// 	case app.COMPLETED_TODOS:
			// 		return todo.completed;
			// 	default:
			// 		return true;
			// 	}
			// }, this);

			// var todoItems = shownTodos.map(function (todo) {
			// 	return (
			// 		<TodoItem
			// 			key={todo.id}
			// 			todo={todo}
			// 			onToggle={this.toggle.bind(this, todo)}
			// 			onDestroy={this.destroy.bind(this, todo)}
			// 			onEdit={this.edit.bind(this, todo)}
			// 			editing={this.state.editing === todo.id}
			// 			onSave={this.save.bind(this, todo)}
			// 			onCancel={this.cancel}
			// 		/>
			// 	);
			// }, this);

			// var activeTodoCount = todos.reduce(function (accum, todo) {
			// 	return todo.completed ? accum : accum + 1;
			// }, 0);

			// var completedCount = todos.length - activeTodoCount;

			// if (activeTodoCount || completedCount) {
			// 	footer =
			// 		<TodoFooter
			// 			count={activeTodoCount}
			// 			completedCount={completedCount}
			// 			nowShowing={this.state.nowShowing}
			// 			onClearCompleted={this.clearCompleted}
			// 		/>;
			// }

			// if (todos.length) {
			// 	main = (
			// 		<section className="main">
			// 			<input
			// 				id="toggle-all"
			// 				className="toggle-all"
			// 				type="checkbox"
			// 				onChange={this.toggleAll}
			// 				checked={activeTodoCount === 0}
			// 			/>
			// 			<label
			// 				htmlFor="toggle-all"
			// 			/>
			// 			<ul className="todo-list">
			// 				{todoItems}
			// 			</ul>
			// 		</section>
			// 	);
			// }

			return (
				<div>
					<header className="header">
						<h1>todos</h1>
						<input
							className="new-todo"
							placeholder="What needs to be done?"
						/>
					</header>
				</div>
			);
		}
	}


export default TodoApp


