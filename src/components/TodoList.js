import React from 'react'
import TodoItem from './TodoItem'


const TodoList = (props) => {
    const{setTodoList,todoList} = props;
    return(
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
    )
}
export default TodoList