import React, { useState } from 'react'
import TodoItem from './TodoItem'
import Form from './Form'


const TodoList = (props) => {
    const{setTodoList,todoList} = props;
    const [modal,setModal] = useState(false);
    

    return(
            <>
                <button
                    onClick={ () => {setModal(true)}}
                >Addtask
                </button>
                {modal && <Form setModal={setModal} setTodoList={setTodoList} todoList={todoList}/>}
                <ul>
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
export default TodoList