import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';


const updateItem = (id,userId) => {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${id} `, {
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
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    })
   
}

const TodoItem = (props) => {
    const {title,completed,id,onTaskDelete,onChangeTaskStatus} = props;
    let check = completed ? 'done' : '';

    const deleteTask = useCallback(() => {
        deleteItem(id).then(() => onTaskDelete(id))
     }, [id]);

     const  changeTaskStatus = useCallback(()=>{
        updateItem(id).then(()=>onChangeTaskStatus(id))
     },[id])

    return(
        <li className={check}
            onClick={changeTaskStatus}
        >
            <i className="fa fa-check" aria-hidden="true"></i>
           {title}
           { completed && <i className="fa fa-trash"
                         aria-hidden="true"
                         onClick={ deleteTask }
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