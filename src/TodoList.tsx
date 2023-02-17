import React, {ChangeEvent,KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType


}

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
// тест
// test1
const TodoList: FC<TodoListPropsType> = (props:TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError]= useState<boolean>(false)

    // Проверка на пустой массив и создания столько лищок сколько элемкнтов в массиве
    let tasksList = props.tasks.length
        ? props.tasks.map((task:TasksType) => {
            const changeTaskStatus = (e:ChangeEvent<HTMLInputElement>)=>{
                props.changeTaskStatus(task.id, e.currentTarget.checked )
            }
            const tasksClass = task.isDone ? "task-done" : "task"
            return (
                <li key={task.id} className={tasksClass}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={()=>{props.removeTask(task.id)}}>x</button>
                </li>
            )
        })
        : <span>Yor taskslist is empty</span>


    const addTask = () => {
        const trimmedTitle = title.trim()
        trimmedTitle !== "" ? props.addTask(title) : setError(true)
        setTitle("")
    }

    const errorMessage = error && <p style={{color: "red" , fontWeight: "bold", margin:"0"}}>Title is required</p>;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>)=>{
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            addTask()
        }
    }

    const handlerCreator = (filter: FilterValuesType) => {
        return ()=>{props.changeFilter(filter)}
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        className={error ? "input-error" : ""}
                        value={title}// нужно длдя того, что бы данные хранились не в инпуте а сразу в title
                        onChange={onChangeHandler}
                        onKeyDown={onKeyDownHandler}
                    />
                    <button onClick={addTask}>+</button>
                    {errorMessage}
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button
                        className={props.filter === "all" ? "active-Button" : ""}

                        onClick={handlerCreator('all')}>All</button>
                    <button
                        className={props.filter === "active" ? "active-Button" : ""}
                        onClick={handlerCreator("active")}>Active</button>
                    <button
                        className={props.filter === "completed" ? "active-Button" : ""}
                        onClick={handlerCreator("completed")}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;