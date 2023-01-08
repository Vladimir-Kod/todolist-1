import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from "./TodoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    const TodoListTitle_1: string = "What to learn";
    // const TodoListTitle_2: string = "What to bye";
    // const TodoListTitle_3: string = "Whats to drink";

    // const TodoListTasks_2: Array<TasksType> = [
    //     {id: 0, title: "Dog", isDone: true},
    //     {id: 1, title: "New home", isDone: false},
    //     {id: 2, title: "Car", isDone: false},
    //     {id: 3, title: "NoteBook", isDone: false},
    //     {id: 4, title: "Desktop", isDone: true}
    // ]
    //
    // const TodoListTasks_3: Array<TasksType> = [
    //     {id: 0, title: "Coca-cola", isDone: true},
    //     {id: 1, title: "Coffee", isDone: false},
    //     {id: 2, title: "Tia", isDone: false},
    //     {id: 3, title: "Milk", isDone: false}
    // ]

    let [TodoListTasks_1, setTodoListTasks_1] = useState<Array<TasksType>>([
        {id: 0, title: "HTML&CSS", isDone: true},
        {id: 1, title: "Java Script", isDone: true},
        {id: 2, title: "React", isDone: false},
        {id: 3, title: "PHP", isDone: false},
        {id: 4, title: "C#", isDone: false},
        {id: 5, title: "C++", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: number) {
        let filteredTasks = TodoListTasks_1.filter(task => task.id !== id)
        setTodoListTasks_1(filteredTasks)
    }

    function chengeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let taskForTodoList = TodoListTasks_1;
    if (filter === "completed") {
        taskForTodoList = TodoListTasks_1.filter(task => task.isDone === true)
    }
    if (filter === "active") {
        taskForTodoList = TodoListTasks_1.filter(task => task.isDone === false)
    }



    return (
        <div className="App">
            <TodoList title={TodoListTitle_1}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      chengeFilter={chengeFilter}
            />
            {/*<TodoList title={TodoListTitle_2} tasks={TodoListTasks_2}/>*/}
            {/*<TodoList title={TodoListTitle_3} tasks={TodoListTasks_3}/>*/}
        </div>
    )
}

export default App;
