import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './components/TodoList'
import Loading from './components/Loading';


const setItem = (id,status) => {
  console.log(id,status)
}
const App = ()=> {
const [todoList,setTodoList] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
      setTodoList(data)
    })
  },[]);


  return (
    <div className="Todo">
        {todoList.length === 0 ? <Loading/> : 
        <TodoList todoList={todoList}
                  todoList={todoList} 
                  setTodoList={setTodoList} />}
    </div>
  );
}

export default App;
