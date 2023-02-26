import React from 'react'
const TodoItem = ({todo}) => {
return (
<tr>
<td>{todo.project_note}</td>
<td>{todo.text_note}</td>
<td>{todo.created_note}</td>
<td>{todo.updated_note}</td>
<td>{todo.user_note}</td>
<td>{todo.is_active}</td>
<td><button type='button'>Delete</button></td>
</tr>
)
}
const TodoList = ({todos}) => {
return (
<table>
<th>Проект</th>
<th>Текст заметки</th>
<th>Дата создания</th>
<th>Дата обновления</th>
<th>Пользователь</th>
<th>Is active</th>
<td></td>
{todos.map((todo) => <TodoItem todo={todo} />)}
</table>
)
}
export default TodoList