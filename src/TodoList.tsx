import React, {FC} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    chengeFilter: (value: FilterValuesType) => void
}

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}
// тест
// test1
const TodoList: FC<TodoListPropsType> = (props:TodoListPropsType) => {
    // let tasksList;
    // if (props.tasks.length === 0){
    //     tasksList = <span>Yor taskslist is empty</span>;
    // } else {
    //     tasksList = props.tasks.map((task:TasksType) =>{
    //         return (
    //         <li>
    //             <input type="checkbox" checked={task.isDone}/>
    //             <span>{task.title}</span>
    //         </li>
    //         )
    //     })
    // }

    // Проверка на пустой массив и создания столько лищок сколько элемкнтов в массиве
    let tasksList = props.tasks.length
        ? props.tasks.map((task:TasksType) => {
            return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={()=>{props.removeTask(task.id)}}>x</button>
                </li>
            )
        })
        : <span>Yor taskslist is empty</span>



    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button onClick={()=>{props.chengeFilter("all")}}>All</button>
                    <button onClick={()=>{props.chengeFilter("active")}}>Active</button>
                    <button onClick={()=>{props.chengeFilter("completed")}}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;