import React, { Component } from 'react'
import './App.css';


export default class AddTodo extends Component {
    render() {
        return (
            <div>
                <input value={this.props.todoInput} onChange={this.props.handleInput} required />
                <button className="myButton" onClick={this.props.handleClick}>Add Todo</button>
            </div>
        )
    }
}
