import React, { Component } from 'react'
import AddTodo from './AddTodo.js';
import request from 'superagent';
import './App.css';


export default class TodoApp extends Component {
    // initial state as an empty array
    state = { todos: [] }

    // getting the list of todos from the database
    componentDidMount = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        const todos = await request.get('https://secure-river-88477.herokuapp.com/api/todos').set('Authorization', user.token);

        this.setState({ todos: todos.body })
    }

    // creating optimistic rendering
    handleClick = async () => {
        const newTodo = {
            id: Math.random(),
            task: this.state.todoInput,
            complete: false,
        };

        const user = JSON.parse(localStorage.getItem('user'));

        // spread operator
        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos });
        // updating the database with the user todo input
        const data = await request.post('https://secure-river-88477.herokuapp.com/api/todos', {
            task: this.state.todoInput
        }).set('Authorization', user.token);
    }

    handleInput = (e) => { this.setState({ todoInput: e.target.value }) };



    render() {
        return (
            <div className="container">
                <AddTodo
                    todoInput={this.state.todoInput}
                    handleClick={this.handleClick}
                    handleInput={this.handleInput}
                />
                {
                    this.state.todos.map((todo, index) => <p className="todos"
                        style={{
                            textDecoration: todo.complete ? 'line-through' : 'none'
                        }}

                        onClick={async () => {

                            // lets mutate! make a copy of the array in state
                            const newTodos = this.state.todos.slice();

                            // go find whichever todo we're talking about here
                            const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);

                            matchingTodo.complete = !todo.complete

                            const user = JSON.parse(localStorage.getItem('user'));

                            this.setState({ todos: newTodos });

                            //updating the database actually
                            const data = await (await request.put(`https://secure-river-88477.herokuapp.com/api/todos/${todo.id}`, matchingTodo)).set('Authorization', user.token);

                            const deleteTodos = async () => {
                                return this.state.todos.splice(index, 1);
                            };

                        }} key={todo.id}> {todo.task}
                        <button className="delete" onClick={async () => {

                            await request.delete(`https://secure-river-88477.herokuapp.com/api/todos/${todo.id}`);

                            const deletedTodos = this.state.todos.slice();
                            deletedTodos.splice(index, 1);

                            this.setState({ todos: deletedTodos });

                        }}>
                            <span>Delete To Do</span> </button>
                    </p>)
                }


            </div>
        )
    }
}
