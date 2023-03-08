import React from 'react'


class TodoForm extends React.Component {
constructor(props) {
super(props)
this.state = {
    project_note: props?.projects?.[0]?.id,
    text_note: '',
    user_note: props?.users?.[0]?.id}
}

handleChange(event){
this.setState({[event.target.name]: event.target.value});
}


handleSubmit(event) {
this.props.createTodo(this.state.project_note, this.state.text_note, this.state.user_note)
event.preventDefault()
}


render() {
    return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
            <div className="form-group">
            <label for="project_note">Проект</label>
                <select name="project_note" className='form-control' onChange={(event)=>this.handleChange(event)}>
                {this.props.projects.map((project)=><option value={project.id}>{project.name_project}</option>)}
                </select>
            </div>


            <div className="form-group">
            <label for="text_note">Текст заметки</label>
                <input type="text" className="form-control" name="text_note"
                value={this.state.text_note} onChange={(event)=>this.handleChange(event)} />
            </div>

            <div className="form-group">
            <label for="user_note">Пользователь сделавший заметку</label>
            <select name="user_note" className='form-control' onChange={(event)=>this.handleChange(event)}>
            {this.props.users.map((user)=><option value={user.id}>{user.user_name}</option>)}
            </select>

            </div>


        <input type="submit" className="btn btn-primary" value="Save" />
        </form>
        );
        }
        }



export default TodoForm