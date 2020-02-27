import React, { Component } from 'react'
import request from 'superagent'

export default class TodoAppLogin extends Component {

    state = {
        usernameSignIn: '',
        usernameSignUp: '',
        passwordSignIn: '',
        passwordSignUp: '',
    }

    handleSignIn = async () => {
        const signIn = await request.post(`https://secure-river-88477.herokuapp.com/api/auth/signin`, {
            email: this.state.usernameSignIn,
            password: this.state.passwordSignIn,
        })

        localStorage.setItem('user', JSON.stringify(signIn.body));
    }

    handleSignUp = async () => {
        const signUp = await request.post(`https://secure-river-88477.herokuapp.com/api/auth/signup`, {
            email: this.state.usernameSignUp,
            password: this.state.passwordSignUp,
        })

        localStorage.setItem('user', JSON.stringify(signUp.body));
        
    }

    render() {
        return (
            <div>
                <div id="welcome">Sign In to start saving your To-Dos!</div>
                Email <input value={this.state.usernameSignUp} onChange={(e) => this.setState({ usernameSignUp: e.target.value })} /> 
                Password: <input value={this.state.passwordSignUp} onChange={(e) => this.setState({ passwordSignUp: e.target.value })} />

                <button className ="myButton" onClick={this.handleSignUp}>Sign up</button>
                <br />
                Email: <input value={this.state.usernameSignIn} onChange={(e) => this.setState({ usernameSignIn: e.target.value })} />
                Password: <input value={this.state.passwordSignIn} onChange={(e) => this.setState({ passwordSignIn: e.target.value })} />

                <button className ="myButton" onClick={this.handleSignIn}>Sign in</button>
            </div>
        )
    }
}
