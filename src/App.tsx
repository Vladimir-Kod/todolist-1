import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import ButtonAppBar from "./ButtonAppBar";
// import {Container} from "@mui/material";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export type FilterValuesType = "all" | "active" | "completed";

export type todolistsType = {
    id: string
    title: string
    filter: filterValueType
}

type tasksStateType = {
    [key:string]: TaskType[]
}

export type filterValueType = "all" | "completed" | "active"

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();
    let newTodolistID = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<tasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistID:string, id: string) {
        setTasks({...tasks,[todolistID]:tasks[todolistID].filter( f => f.id !== id) })
    }

    function addTask(todolistID:string, title: string) {
         let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistID]: [newTask, ...tasks[todolistID]]})

    }

    function changeStatus(todolistID:string,taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID] : tasks[todolistID].map( t => t.id===taskId ? {...t, isDone: isDone }: t)})

    }

    function changeEditableSpan (todolistID:string,taskId: string, newTitle: string) {
        setTasks({...tasks, [todolistID] : tasks[todolistID].map( t => t.id===taskId ? {...t, title: newTitle }: t)})

    }

    const changeTodolistTitle = (todolistID: string,newTitle:string)=>{
        const todolist = todolists.find(tl=>tl.id ===todolistID);
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }


    const deleteTodolist = (todolistID: string)=>{
        setTodolists(todolists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]

    }

    function changeFilter(todolistID:string, value: FilterValuesType) {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter: value} : t))
    }

    const addNewTodolist = (title:string)=> {
        const newTodolist: todolistsType = {id: newTodolistID, title: title, filter: 'all'};
        setTodolists([newTodolist,...todolists])
        setTasks({...tasks,[newTodolistID]:[]})
    }


    return (
        <div className="App">
            <ButtonAppBar />

            <Container fixed>
                <Grid container style={{padding:"15px"}}>
                    <AddItemForm addItem={(title)=>{addNewTodolist(title)}} />
                </Grid>

                <Grid container spacing={3}>
                    <Grid container spacing={3}></Grid>
                    {todolists.map((mapTodolists) => {

                        let tasksForTodolist = tasks[mapTodolists.id];

                        if (mapTodolists.filter === "active") {
                            tasksForTodolist = tasks[mapTodolists.id].filter(t => t.isDone === false);
                        }
                        if (mapTodolists.filter === "completed") {
                            tasksForTodolist = tasks[mapTodolists.id].filter(t => t.isDone === true);
                        }
                        return (
                            <Grid item>
                                <Paper elevation={12} style={{padding:"15px", backgroundColor:"navajowhite"}}>
                                <Todolist
                                    key={mapTodolists.id}
                                    todolistID={mapTodolists.id}
                                    title={mapTodolists.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={mapTodolists.filter}
                                    deleteTodolist={deleteTodolist}
                                    changeEditableSpan={changeEditableSpan}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                            </Grid>

                        )
                    })}
                </Grid>

            </Container>





        </div>
    );
}

export default App;