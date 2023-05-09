import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodoList from './components/Todo.js';
import ProjectForm from './components/ProjectForm.js';
import TodoForm from './components/TodoForm.js';
import LoginForm from './components/Auth.js';
import axios from 'axios';
import {HashRouter, Route, Link, Switch, BrowserRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';

class App extends React.Component {
constructor(props) {
super(props)
this.state = {
'users': [],
'projects': [],
'todos': []
}
}

set_token(token) {
const cookies = new Cookies()
cookies.set('token', token)
this.setState({'token': token}, ()=>this.load_data())
}

is_authenticated() {
return this.state.token != ''
}

logout() {
this.set_token('')
}

get_token_from_storage() {
const cookies = new Cookies()
const token = cookies.get('token')
this.setState({'token': token}, ()=>this.load_data())
}

get_token(login, password) {
axios.post('http://127.0.0.1:8000/api-token-auth/', {username: login, password: password})
.then(response => {
this.set_token(response.data['token'])
}).catch(error => alert('Неверный логин или пароль'))
}

get_headers() {
let headers = {
'Content-Type': 'application/json',
}
if (this.is_authenticated())
{
headers['Authorization'] = 'Token ' + this.state.token
}
return headers
}

createProject(name_project, link_to_the_repository, users ) {
    const headers = this.get_headers()
    const data = {name_project: name_project,
                  link_to_the_repository: link_to_the_repository,
                  users: users}
    axios.post(`http://127.0.0.1:8000/api/project/`, data, {headers})
        .then(response => {
    let new_project = response.data
    const users = this.state.users.filter((user) => user.id === new_project.users)[0]
    new_project.users = users
    this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))
    }


createTodo(project_note, text_note, user_note ) {
    const headers = this.get_headers()
    const data = {project_note: project_note,
                  text_note: text_note,
                  user_note: user_note}
    axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers})
        .then(response => {
    let new_todo = response.data
    const users = this.state.users.filter((user) => user.id === new_todo.users)[0]
    const projects = this.state.projects.filter((project) => project.id === new_todo.project)[0]
    new_todo.project_note = projects
    new_todo.user_note = users
    this.setState({todos: [...this.state.todos, new_todo]})
        }).catch(error => console.log(error))
    }


deleteProject(id) {
    const headers = this.get_headers();
    axios.delete(`http://127.0.0.1:8000/api/project/${id}/`, {'headers': headers})
    .then(response => {
    this.setState({projects: this.state.projects.filter((project)=>project.id !==
    id)})
    }).catch(error => console.log(error))
}


deleteTodo(id) {
    const headers = this.get_headers();

    axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`, {'headers': headers}).then(response => {
    this.setState({todos: this.state.todos.filter((todo)=>todo.id !==
    id)})
    }).catch(error => console.log(error))
}


load_data() {
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users/', {headers})
    .then(response => {
    const users = response.data.results
    this.setState(
    {
    'users': users
    }
    )
    }).catch(error => console.log(error))
    this.setState({users: []})

    axios.get('http://127.0.0.1:8000/api/project/', {headers})
    .then(response => {
    const projects = response.data.results
    this.setState(
    {
    'projects': projects
    }
    )
    }).catch(error => console.log(error))
    this.setState({projects: []})

    axios.get('http://127.0.0.1:8000/api/todo/', {headers})
    .then(response => {
    const todos = response.data.results
    this.setState(
    {
    'todos': todos
    }
    )
    }).catch(error => console.log(error))
    this.setState({todos: []})

}


componentDidMount() {
this.get_token_from_storage()
}


render() {
    return (
    <div className="App">
    <BrowserRouter>
    <nav>
    <ul>
    <li><Link to='/'>Users</Link></li>
    <li><Link to='/project'>Projects</Link></li>
    <li><Link to='/todo'>Todos</Link></li>
    <li>{this.is_authenticated() ? <button
    onClick={()=>this.logout()}>Logout
    </button> : <Link to='/login'>Login</Link>}</li>
    </ul>
    </nav>
    <Switch>
    <Route exact path='/' component={() => <UserList
    users={this.state.users} />} />


    <Route exact path='/project/create' component={() => <ProjectForm users={this.state.users}
    createProject={(name_project, link_to_the_repository, users) => this.createProject(name_project,
                                                                                       link_to_the_repository,
                                                                                       users)} />} />

    <Route exact path='/project' component={() => <ProjectList
    projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />} />

    <Route exact path='/todo/create' component={() => <TodoForm users={this.state.users}
                                                                projects={this.state.projects}
    createTodo={(project_note, text_note, user_note) => this.createTodo(project_note,
                                                                           text_note,
                                                                           user_note)} />} />

    <Route exact path='/todo' component={() => <TodoList
    todos={this.state.todos} deleteTodo={(id)=>this.deleteTodo(id)} />} />

    <Route exact path='/login' component={() => <LoginForm
    get_token={(login, password) => this.get_token(login, password)} />} />

    </Switch>
    </BrowserRouter>
    </div>
    )
    }
    }

export default App;

