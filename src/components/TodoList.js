import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import {ThemeContext} from '../components/ThemeContext'
import TodoItem from './TodoItem'
import Form from './Form'


const TodoList = (props) => {
    const{setTodoList,todoList} = props;
    const [displayTaskForm ,setDisplayTaskForm]    = useState(false);
    const[isFetching,hasFetched] = useState(false);

    const onTaskDelete = (id) => {
       const updatedTotoList = todoList.filter( todo => todo.id != id);
      setTodoList(updatedTotoList)  
    }
    const onChangeTaskStatus = (id) => {
       const updatedTotoList = todoList.map( (todo) => {
           if(todo.id === id) {
               todo.completed = !todo.completed
           }
           return todo
       })
        setTodoList(updatedTotoList);  
    }

    return(
            <>
                <button
                    onClick={ () => {setDisplayTaskForm(true)}}
                >Addtask
                </button>
                {displayTaskForm && <Form 
                                        setDisplayTaskForm={setDisplayTaskForm}
                                        setTodoList={setTodoList}
                                        todoList={todoList} 
                                        hasFetched={hasFetched}
                                        />}
                <ul>
                    {isFetching ? 'Loading...' : ''}
                    {props.todoList.map( (todoItem) => {
                    return <TodoItem 
                                key={todoItem.id}
                                {...todoItem}
                                onTaskDelete={onTaskDelete}
                                onChangeTaskStatus={onChangeTaskStatus}
                                todoList={todoList}
                            />
                    })}
                </ul>
            </>
    )
}
TodoList.propTypes = {
    setTodoList:PropTypes.func.isRequired,
    todoList:PropTypes.array.isRequired
}
export default TodoList