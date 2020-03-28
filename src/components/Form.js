import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import shortId from 'shortid'



const setTask = (text,userId) => {
    let task = {};
    task['userId'] = userId;
    task['title'] = text;
    task['id'] = shortId.generate();
    task['completed'] = false;
    return task;
}
const hadleSubmit = (e,title,user,todoList,setTodoList,hasFetched) => {
    e.preventDefault();
    hasFetched(true)
    const taskList = [...todoList];
   
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body:'bar',
          completed:false
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(newTask => {
        const task = setTask(title,user);
        taskList.unshift(task);
        setTodoList(taskList);
        hasFetched(false);
      })
}

const Form = (props) => {
    const {setDisplayTaskForm,todoList,setTodoList,hasFetched} = props;
    const [title,setTitle] = useState('');
    const [userList,setUserList] = useState([]);
    const[user,setUser] = useState();

    useEffect( () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => setUserList(users))
    },[]);
    return(
        <form onSubmit={(e)=>{ hadleSubmit(e,title,user,todoList,setTodoList,hasFetched); setDisplayTaskForm(false) }} >
           <p>
               <label>
                    <span>Task</span>
                    <textarea type="text" onChange={(e) =>setTitle(e.target.value)} value={title} required/>
                </label>
            </p>
            <p>
                <select  onChange={ (e) => {setUser(e.target.value)}} value={user} placeholder={'Select user'} required>
                    {/* <option value="">Select user</option> */}
                     {userList.length > 0 && userList.map( (user) => {
                        return (
                        <option key={user.id} value={user.id}>{user.name}</option>
                        )})}
                </select>
            </p>
            <p>
                <button>Save</button>
                <button
                onClick={() => {setDisplayTaskForm(false)}}
                >cancel</button>
            </p>
        </form>
    )
}
Form.propTypes = {
    setDisplayTaskForm:PropTypes.func.isRequired,
    todoList:PropTypes.array.isRequired,
    setTodoList:PropTypes.func.isRequired
}
export default Form