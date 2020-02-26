import React, { Component } from 'react';
import TodoApp from './TodoApp.js';
import './App.css';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch,
 } from 'react-router-dom';


 export default class App extends Component {
  render () {
  
  return (
    <div className="App">
        <header>
            DO IT OR UNDO IT TO-DO LIST
        </header>
        <Router>
            <Switch>
                <Route exact path="/" component={ TodoApp }/>
                {/* <Route exact path="/login" component= { User }/> */}
            </Switch>
        </Router>

    </div>
  );
}
}
