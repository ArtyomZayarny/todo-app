import React, { useState, useEffect, useCallback } from 'react';
import TodoList from './components/TodoList'
import Loading from './components/Loading';
import ThemeContext from './components/ThemeContext'



const App = ()=> {
const [todoList,setTodoList] = useState([]);
const[theme,setTheme] = useState('light');
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
      setTodoList(data)
    })
  },[]);


  return (
    <div className="Todo">
      <ThemeContext.provider value={theme}>
          <div>
              <p>Change theme</p> 
              <span className="circle light" ></span>
              <span className="circle dark"></span>
          </div>
        {todoList.length === 0 ? <Loading/> : 
        <TodoList todoList={todoList}
                  todoList={todoList} 
                  setTodoList={setTodoList} />}

      </ThemeContext.provider>
    </div>
  );
}

export default App;
