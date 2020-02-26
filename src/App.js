import React from 'react';
import TodoApp from './TodoApp.js';
import './App.css';
import { 
    BrowserRouter, 
    Route, 
    Switch,
 } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <header>
            DO IT OR UNDO IT TODO LIST
        </header>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={ TodoApp }/>
            </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;