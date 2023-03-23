import { useEffect, useRef, useState } from "react";
import { HiPlus } from "react-icons/hi";
import { BsTrashFill } from "react-icons/bs";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("to-do")) || []
  );
  const [taskToAdd, setTaskToAdd] = useState("");
  const inputFocus = useRef(null)
  const handleSetToAdd = (value) => {
    if(value.length > 15) {
      return alert('O texto nao pode ser maior que quinze caracteres!')
    }
    setTaskToAdd(value);
  }

  const clearTasks = () => {
    localStorage.setItem('to-do', JSON.stringify(''))
    setTasks(JSON.parse(localStorage.getItem("to-do")) || [])
  }

  const deleteTask = (index) => {
    tasks.splice(index, 1)
    localStorage.setItem('to-do', JSON.stringify(tasks))
    setTaskToAdd('')
    setTasks(JSON.parse(localStorage.getItem("to-do")) || [])
    inputFocus.current.focus();
  }

  const handleClick = () => {
    if(taskToAdd.length <= 0) {
      return alert('Pra inserir a tarefa precisa ter um valor!')
    } 
    tasks.push(taskToAdd)
    localStorage.setItem('to-do', JSON.stringify(tasks))
    setTaskToAdd('')
    setTasks(JSON.parse(localStorage.getItem("to-do")) || [])
    inputFocus.current.focus();
  }


  
  return (
    <div className="App">
      <div class="wrapper">
        <div class="main-content">
          <div class="header">
            <h1 class="header-text">Todo App</h1>
            <div class="add-bar">
              <input
                type="text"
                value={taskToAdd}
                onChange={(e) => {handleSetToAdd(e.target.value)}}
                id="task-text-input"
                ref={inputFocus}
                placeholder="Digite aqui sua tarefa."
              />
              <button id="add-task-input" onClick={() => {handleClick()}} class="btn-style">
                <HiPlus style={{ color: 'white', transform: 'scale(2)'}}/>
              </button> 
            </div>
          </div>
          <div class="allTasks">
            {tasks.length > 0 && tasks.map((task, index) => (
              <ul class="task-box">
                <li class="task-content" id={index}>
                  {task} {index}
                  <button class="btn-style-remove btn-hover" id=""><BsTrashFill style={{ color: 'white', transform: 'scale(1.4)'}} onClick={() => {deleteTask(index)}}/></button>
                </li>
              </ul>
            ))}
          </div>
          <div class="footer">
              <div class="pendingTasks">Você tem {tasks.length} tarefas pendentes.</div>
            <div class="clear-button-wrapper ">
              <button type="submit" class="btn-style" id="clear-all" onClick={() => {clearTasks()}}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
