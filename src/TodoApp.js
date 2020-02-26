import React, { Component } from 'react'
import AddTodo from './AddTodo.js';
import request from 'superagent';
import './App.css';


export default class TodoApp extends Component {
    // initial state as an empty array
    state = { todos: [] }

    // getting the list of todos from the database
    componentDidMount = async () => {
        const todos = await request.get('https://secure-river-88477.herokuapp.com/api/todos')

        this.setState({ todos: todos.body })
    }

    // creating optimistic rendering
    handleClick = async () => {
        const newTodo = {
            id: Math.random(),
            task: this.state.todoInput,
            complete: false,
        };

        // spread operator
        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos });
        // updating the database with the user todo input
        const data = await request.post('https://secure-river-88477.herokuapp.com/api/todos', {
            task: this.state.todoInput
        });
    }

    handleInput = (e) => { this.setState({ todoInput: e.target.value }) };

    handleDelete = async () => {
        await request.delete(`https://secure-river-88477.herokuapp.com/api/todos${this.state.todo.id}`);
    }

    render() {
        return (
            <div className="container">
                <AddTodo
                    todoInput={this.state.todoInput}
                    handleClick={this.handleClick}
                    handleInput={this.handleInput}
                />
                {
                    this.state.todos.map((todo) => <p className="todos"
                        style={{
                            textDecoration: todo.complete ? 'line-through' : 'none'
                        }}
                        onClick={async () => {

                            // lets mutate! make a copy of the array in state
                            const newTodos = this.state.todos.slice();

                            // go find whichever todo we're talking about here
                            const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);

                            matchingTodo.complete = !todo.complete

                            this.setState({ todos: newTodos });

                            //updating the database actually
                            const data = await request.put(`https://secure-river-88477.herokuapp.com/api/todos/${todo.id}`, matchingTodo);

                        }} key={todo.id}> {todo.task}
                    </p>)
                }

            </div>
        )
    }
}
