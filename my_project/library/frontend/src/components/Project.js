import React from 'react'


const ProjectItem = ({project}) => {
return (
<tr>
<td>{project.name_project}</td>
<td>{project.link_to_the_repository}</td>
<td>{project.users}</td>
</tr>
)
}
const ProjectList = ({projects}) => {
return (
<table>
<th>Name project</th>
<th>Link to the repository</th>
<th>Users</th>
{projects.map((project) => <ProjectItem project={project} />)}
</table>
)
}
export default ProjectList