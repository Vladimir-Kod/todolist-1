import React from 'react';
import './App.css';
import TodoList, {TasksType} from "./TodoList";


function App() {
    const TodoListTitle_1: string = "What to learn";
    const TodoListTitle_2: string = "What to bye";
    const TodoListTitle_3: string = "Whats to drink";

    const  TodoListTasks_1: Array<TasksType> = [
        {id: 0,title: "HTML&CSS", isDone: true},
        {id: 1,title: "Java Script", isDone: false},
        {id: 2,title: "React", isDone: true}
    ]

    const TodoListTasks_2: Array<TasksType> = [
        {id: 0,title: "Dog", isDone: true},
        {id: 1,title: "New home", isDone: false},
        {id: 2,title: "Car", isDone: false},
        {id: 3,title: "NoteBook", isDone: false},
        {id: 4,title: "Desktop", isDone: true}
    ]

    const TodoListTasks_3: Array<TasksType> = [
        {id: 0,title: "Coca-cola", isDone: true},
        {id: 1,title: "Coffee", isDone: false},
        {id: 2,title: "Tia", isDone: false},
        {id: 3,title: "Milk", isDone: false}
    ]

    return (
        <div className="App">
            <TodoList title={TodoListTitle_1} tasks={TodoListTasks_1}/>
            <TodoList title={TodoListTitle_2} tasks={TodoListTasks_2}/>
            <TodoList title={TodoListTitle_3} tasks={TodoListTasks_3}/>
        </div>
    )
}

export default App;
