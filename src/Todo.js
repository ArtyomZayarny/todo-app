import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList'
import Loading from './components/Loading';
import {ThemeContext} from './components/ThemeContext'


const Todo = ()=> {
const [todoList,setTodoList] = useState([]);
const[theme,setTheme] = useState('');
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
      setTodoList(data)
    })
  },[]);

  return (
      <ThemeContext.Provider value={theme}>
          <div className={`Todo ${theme}`} >
                <div className="theme-toggle">
                    <p>Change theme</p> 
                    <span className="circle light" onClick={()=>{setTheme('light')}}></span>
                    <span className="circle dark" onClick={()=>{setTheme('dark')}}></span>
                </div>
              {todoList.length === 0 ?
               <Loading/> : 
               <TodoList todoList={todoList}
                        setTodoList={setTodoList} 
                />}
          </div>
        </ThemeContext.Provider>
  );
}

export default Todo;
