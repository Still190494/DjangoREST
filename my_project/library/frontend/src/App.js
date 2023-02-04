import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project';
import TodoList from './components/Todo';
import axios from 'axios'

class App extends React.Component {
constructor(props) {
super(props)
this.state = {
'users': [],
'projects': [],
'todos': []
}
}


componentDidMount() {
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


render () {
return (
<div>
<UserList users={this.state.users} />
</div>
)
}
}
export default App;

