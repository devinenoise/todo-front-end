import React, { Component } from 'react';
import TodoApp from './TodoApp.js';
import './App.css';
import TodoAppLogin from './TodoAppLogin'
import { 
    BrowserRouter as Router, 
    Route, 
    Redirect,
 } from 'react-router-dom';


const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

 export default class App extends Component {
  render () {
  
  return (
    <div className="App">
        <header>
            DO IT OR UNDO IT TO-DO LIST
        </header>
        <Router>
                <Route exact path='/' render={() => 
                isLoggedIn()
                    ? <TodoApp />
                    : <Redirect to='/login' />
                }/> 
                <Route exact path="/login" component= { TodoAppLogin }/>
        </Router>

    </div>
  );
}
}
