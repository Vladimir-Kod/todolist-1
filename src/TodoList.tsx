import React, {FC} from 'react';

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
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
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;