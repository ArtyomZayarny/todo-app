import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import {ThemeContext} from '../components/ThemeContext'
import TodoItem from './TodoItem'
import Form from './Form'


const TodoList = (props) => {
    const{setTodoList,todoList} = props;
    const [modal,setModal]    = useState(false);
    const[process,setProcess] = useState(false)
    return(
            <>
                <button
                    onClick={ () => {setModal(true)}}
                >Addtask
                </button>
                {modal && <Form setModal={setModal} setTodoList={setTodoList} todoList={todoList} setProcess={setProcess}/>}
                <ul>
                    {process ? 'Loading...' : ''}
                    {props.todoList.map( (todoItem) => {
                    return <TodoItem 
                                key={todoItem.id}
                                {...todoItem}
                                setTodoList={setTodoList}
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