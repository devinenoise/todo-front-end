import React, { Component } from 'react'
import AddTodo from './AddTodo.js';
import request from 'superagent';

export default class TodoApp extends Component {
    state = { todos: [] }


    componentDidMount = async() => {
        const todos = await request.get('https://secure-river-88477.herokuapp.com/api/todos')

        this.setState({ todos: todos.body })
    }

    handleClick = async () => {
        const newTodo = {
            // math.random() is fine here because this is a fake todo
            id: Math.random(),
            task: this.state.todoInput,
            complete: false,
        };

        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos });
        const data = await request.post('https://secure-river-88477.herokuapp.com/api/todos', {
            task: this.state.todoInput
        });
    }

    handleInput = (e) => { this.setState({ todoInput: e.target.value })};
    
    render() {
        return (
            <div>
                <AddTodo 
                todoInput={ this.state.todoInput } 
                handleClick={ this.handleClick } 
                handleInput={ this.handleInput } 
            />
                {
                    this.state.todos.map((todo) => <p 
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
                        const data = await request.put(`https://secure-river-88477.herokuapp.com/api/todos/${todo.id}`, matchingTodo);
                    }} key={todo.id}>
                        {todo.task}
                    </p>)
                }
            </div>
        )
    }
}
