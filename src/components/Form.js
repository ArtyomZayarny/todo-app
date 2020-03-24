import React, {useState, useEffect} from 'react'
import shortId from 'shortid'



const setUpTask = (text,userId) => {
    let task = {}
    task['userId'] = userId;
    task['title'] = text;
    task['id'] = shortId.generate();
    task['completed'] = false;
    return task;
}
const hadleSubmit = (e,title,user,todoList) => {
    const taskList = [...todoList];
    e.preventDefault();
    const task = setUpTask(title,user); 
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: 'bar',
          userId: user
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(json => console.log(json))
    taskList.unshift(task);
    return taskList


}

const Form = (props) => {
const {setModal,todoList,setTodoList} = props;
const [title,setTitle] = useState('');
const [userList,setUserList] = useState([]);
const[user,setUser] = useState();
const[task,setTask] = useState({})

useEffect( () => {
 fetch('https://jsonplaceholder.typicode.com/users')
 .then(response => response.json())
 .then(users => setUserList(users))
},[]);
    return(
        <form onSubmit={(e)=>{setTodoList(hadleSubmit(e,title,user,todoList)); setModal(false) }}>
  
           <p>
               <label>
                     <span>Task</span>
                    <textarea type="text" onChange={(e) =>setTitle(e.target.value)} value={title} required/>
                </label>
            </p>
            <p>
                <select  onChange={ (e) => {setUser(e.target.value)}} value={user} required>
                    <option value="Select user">Select user</option>
                 {userList.length > 0 && userList.map( (user) => {
                        return (
                        <option key={user.id} value={user.id}>{user.name}</option>
                        )})}
                </select>
            </p>
            <p>
                <button>Save</button>
                <button
                onClick={() => {setModal(false)}}
                >cancel</button>
            </p>
        </form>
    )
}
export default Form