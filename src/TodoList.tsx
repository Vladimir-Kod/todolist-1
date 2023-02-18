import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeEditableSpan: (todolistID: string, taskId: string, newTitle:string) => void
    filter: FilterValuesType
    todolistID: string
    deleteTodolist: (todolistID: string) => void
    changeTodolistTitle: (todolistID: string,newTitle:string)=> void

}

export function Todolist(props: PropsType) {

    const onClickButtonDeleteHandler = () => {
        props.deleteTodolist(props.todolistID)
    }



    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const addTask = (title: string)=> {
        props.addTask(props.todolistID, title)
    }

    const changeTodolistTitle = (newTitle:string)=>{
        props.changeTodolistTitle(props.todolistID,newTitle)
    }

    return <div>


        <h3>
            <EditableSpan title={props.title} onChangeEditableSpan={changeTodolistTitle}/>

            <IconButton aria-label="+" onClick={onClickButtonDeleteHandler} style={{color:"indianred"}}>
                <DeleteIcon />
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask} />
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    const onChangeEditableSpan = (newTitle:string)=>{
                        props.changeEditableSpan(props.todolistID, t.id,newTitle)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            defaultChecked
                            onChange={onChangeHandler}
                            checked={t.isDone}
                        />

                        {/*<input type="checkbox"*/}
                        {/*       onChange={onChangeHandler}*/}
                        {/*       checked={t.isDone}/>*/}

                        <EditableSpan title={t.title} onChangeEditableSpan={onChangeEditableSpan}/>
                        <IconButton aria-label="+" onClick={onClickHandler} style={{color:"indianred"}}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                })
            }
        </ul>

        <div>
            <Button variant={props.filter === 'all' ? "outlined" : "contained"} color="success" onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? "outlined" : "contained"} color="error" onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? "outlined" : "contained"} color="secondary" onClick={onCompletedClickHandler}>Completed</Button>

       </div>

    </div>
}





