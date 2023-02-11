import Todo from './components/Todo';
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

import React, {useState} from "react";
import {nanoid} from "nanoid";

// Примітка: ми визначаємо ці константи поза нашою App()функцією, тому що якби вони були визначені всередині неї,
// вони б перераховувалися щоразу, коли компонент <App />повторно візуалізується, а ми цього не хочемо.
// Ця інформація ніколи не зміниться, що б не робила наша програма.

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP)


function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');


  const addTask = (name) => {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false};
    setTasks([...tasks, newTask]);
  }

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) return {...task, completed: !task.completed}

      return task;
    })

    setTasks(updatedTasks);
  }

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) return {...task, name: newName}

      return task
    })
    setTasks(editedTaskList)
  }

  const filterList = FILTER_NAMES.map((name) => (

    <FilterButton key={name}
                  name={name}
                  isPressed={true}
                  setFilter={setFilter}/>

  ))

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));



  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form addTask={addTask}/>

      <div className="filters btn-group stack-exception">

        {filterList}


      </div>

      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
