import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


const updateItem = (id,userId) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id} `, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          title: 'foo',
          body: 'bar',
          userId: userId
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(json => console.log(json))
}
const deleteItem = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    })
}

const TodoItem = (props) => {
    const {title,completed,id,userId,todoList,setTodoList} = props;
    const[done,setDone] = useState(completed);
    const[taskId,setTaskId] = useState(id);
    let [action,setAction] = useState('');
    useEffect(()=>{
        let updatedList;
        switch(action) {
            case 'update':
                updatedList = todoList.map((todo)=> {
                    if(todo.id === taskId) {
                        todo.completed = done;
                    }
                    return todo
                });
                updateItem(taskId,userId)
                setTodoList(updatedList)
            break;
            case 'delete':
                updatedList =  todoList.filter( (todo) =>  todo.id !== taskId)
                deleteItem(taskId)
                setTodoList(updatedList);
                break;
            }
           
    },[done,action]);
   
    let check = done ? 'done' : '';
    return(
        <li className={check}
            onClick={()=>{
                setTaskId(id)
                setAction('update')
                setDone(!done)
            }}
        >
            <i className="fa fa-check" aria-hidden="true"></i>
           {title}
           { done && <i className="fa fa-trash" aria-hidden="true"
                onClick={ (e) => {
                    setAction('delete')
                    e.stopPropagation();
                 } 
                }
            ></i> }
               
        </li>
    )
}
TodoItem.propTypes = {
    title:PropTypes.string.isRequired,
    completed:PropTypes.bool.isRequired,
    todoList:PropTypes.array.isRequired,
    setTodoList:PropTypes.func.isRequired
}
export default TodoItem