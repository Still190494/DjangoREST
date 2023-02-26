import React from 'react'


const ProjectItem = ({project, deleteProject}) => {
return (
<tr>
<td>{project.name_project}</td>
<td>{project.link_to_the_repository}</td>
<td>{project.users}</td>
<td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
</tr>
)
}
const ProjectList = ({projects, deleteProject}) => {
return (
<table>
<tr>
<th>Название проекта</th>
<th>Ссылка на репозиторий</th>
<th>Пользователь</th>
</tr>
{projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}
 />)}
</table>
)
}
export default ProjectList