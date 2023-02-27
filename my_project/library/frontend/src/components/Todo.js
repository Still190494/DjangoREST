import React from 'react'
import {Link} from 'react-router-dom'

const TodoItem = ({todo, deleteTodo}) => {
return (
<tr>
<td>{todo.project_note}</td>
<td>{todo.text_note}</td>
<td>{todo.created_note}</td>
<td>{todo.updated_note}</td>
<td>{todo.user_note}</td>
<td>{todo.is_active}</td>
<td><button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button></td>
</tr>
)
}
const TodoList = ({todos, deleteTodo}) => {
return (
<div>
<table>
<tr>
<th>Проект</th>
<th>Текст заметки</th>
<th>Дата создания</th>
<th>Дата обновления</th>
<th>Пользователь</th>
<th>Is active</th>
</tr>
{todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
</table>
<Link to='/todo/create'>Create</Link>
</div>
)
}
export default TodoList