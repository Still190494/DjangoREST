import React from 'react'


class ProjectForm extends React.Component {
constructor(props) {
super(props)
this.state = {
    name_project: '',
    link_to_the_repository: '',
    users: props?.users?.[0]?.id}
}

handleChange(event){
this.setState({[event.target.name]: event.target.value});
}


handleSubmit(event) {
this.props.createProject(this.state.name_project, this.state.link_to_the_repository, this.state.users)
event.preventDefault()
}


render() {
    return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
            <label for="name">name_project</label>
                <input type="text" className="form-control" name="name_project"
                value={this.state.name_project} onChange={(event)=>this.handleChange(event)} />
            </div>


            <div className="form-group">
            <label for="url">link_to_the_repository</label>
                <input type="text" className="form-control" name="link_to_the_repository"
                value={this.state.link_to_the_repository} onChange={(event)=>this.handleChange(event)} />
            </div>

            <div className="form-group">
            <label for="users">users</label>
            <select name="users" className='form-control' onChange={(event)=>this.handleChange(event)}>
            {this.props.users.map((user)=><option value={user.id}>{user.id}</option>)}
            </select>
            </div>


        <input type="submit" className="btn btn-primary" value="Save" />
        </form>
        );
        }
        }



export default ProjectForm
