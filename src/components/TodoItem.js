import React, { useState, useEffect, useCallback } from 'react';




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
    const[deleteId,setDeleteId] = useState(null);
    let updatedTodoList = null;

    if(deleteId) {
        updatedTodoList =  todoList.filter( (todo) =>  todo.id !== deleteId)
        setTodoList(updatedTodoList)
    }
   
    let check = done ? 'done' : '';
    return(
        <li className={check}
            onClick={()=>{
                 updateItem(id,userId)
                 setDone(!done)}}
        >
            <i className="fa fa-check" aria-hidden="true"></i>
           {title}
           <i className="fa fa-trash" aria-hidden="true"
                onClick={ (e) => {
                    e.stopPropagation();
                    setDeleteId(id)
                 } 
                }
           ></i>
               
        </li>
    )
}
export default TodoItem