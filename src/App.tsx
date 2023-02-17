import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "completed" | "active";

function App() {
    const TodoListTitle_1: string = "What to learn";

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "Java Script", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "PHP", isDone: false},
        {id: v1(), title: "C#", isDone: false},
        {id: v1(), title: "C++", isDone: false}
    ])
    
    const removeTask = (taskId: string) => {
        let filteredTasks = tasks.filter(task => task.id !== taskId)
        setTasks(filteredTasks)
    }

    const [filter, setFilter] = useState<FilterValuesType>("all")

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let taskForTodoList = tasks;
    if (filter === "completed") {
        taskForTodoList = tasks.filter(task => task.isDone)
    }
    if (filter === "active") {
        taskForTodoList = tasks.filter(task => !task.isDone)
    }


    const addTask = (title: string) => {
       const newTask:TasksType = {
           id: v1(),
           title:  title,
           isDone: false
       };
        setTasks([...tasks, newTask]) // спердом ... мы капируем массив объектов tasks и уже в новый массив мы добовляем
    }//  новую таску, таким образом у нас стало на один объект массива больше и мы добавили новую таску

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map((t)=>t.id === taskId ? {...t, isDone: !t.isDone} : t))
    }


    return (
        <div className="App">
            <TodoList title={TodoListTitle_1}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    )
}

export default App;
