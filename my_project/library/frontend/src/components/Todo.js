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
</tr>
)
}
const TodoList = ({todos}) => {
return (
<table>
<th>Project note</th>
<th>Text note</th>
<th>Created note</th>
<th>Updated note</th>
<th>User note</th>
<th>Is active</th>
{todos.map((todo) => <TodoItem todo={todo} />)}
</table>
)
}
export default TodoList