import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project';
import TodoList from './components/Todo';
import LoginForm from './components/Auth.js'
import axios from 'axios'
import {HashRouter, Route, Link, Switch} from 'react-router-dom'

class App extends React.Component {
constructor(props) {
super(props)
this.state = {
'users': [],
'projects': [],
'todos': []
}
}

load_data() {
    axios.get('http://127.0.0.1:8000/api/users/')
    .then(response => {
    const users = response.data.results
    this.setState(
    {
    'users': users
    }
    )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/project/')
    .then(response => {
    const projects = response.data.results
    this.setState(
    {
    'projects': projects
    }
    )
    }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todo/')
    .then(response => {
    const todos = response.data.results
    this.setState(
    {
    'todos': todos
    }
    )
    }).catch(error => console.log(error))
}


componentDidMount() {
this.load_data()
}


render() {
    return (
    <div className="App">
    <HashRouter>
    <nav>
    <ul>
    <li><Link to='/'>Users</Link></li>
    <li><Link to='/project'>Projects</Link></li>
    <li><Link to='/todo'>Todos</Link></li>
    <li><Link to='/login'>Login</Link></li>
    </ul>
    </nav>
    <Switch>
    <Route exact path='/' component={() => <UserList
    users={this.state.users} />} />
    <Route exact path='/project' component={() => <ProjectList
    projects={this.state.projects} />} />
    <Route exact path='/todo' component={() => <TodoList
    todos={this.state.todos} />} />
    <Route exact path='/login' component={() => <LoginForm />} />
    </Switch>
    </HashRouter>
    </div>
    )
    }
    }

export default App;

