// for production
//in terminal ...\react-task-tracker> npm run build
//            ...\react-task-tracker> npm i -g serve
//            ...\react-task-tracker> serve -s build -p 8000
// our fake server. 
//in terminal ...\react-task-tracker> npm i json-server
//            ...\react-task-tracker> npm run server
// start the react dev server
//in terminal ...\react-task-tracker> npm start


import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'


const App = () => {
  // hide the add task input component until user clicks the Add button. changing the state to true
  const [showAddTask, setShowAddTask] = useState (false)
  
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    
    return data
  }
 
   // Fetch a Single Task
   const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    
    return data
  }


  // ADD Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST', 
      headers: {'Content-type': 'application/json'},
    body: JSON.stringify(task)
    })

    // new task that is added. need to await because fetchTask is an async function that returns a promise
    const data = await res.json()
    // can't push into an array. Need to set the state by spreading the tasks, then adding the new task to the end
    setTasks([...tasks, data])
  }

  // DELETE Task
  const deleteTask = async (id) => {
    //setTasks to set the state
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter((task)=> task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => 
        task.id === id ? {...task, reminder: !task.reminder } : task
      )
    )
  }

  return (
    <Router>
    <div className='container'>
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      <Route path='/' exact render={(props) => (
        <>
          {/* && is a shorthand way of doing a ternary operator when there is no else option */}
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? (
            <Tasks tasks={tasks} onDelete=
            {deleteTask} onToggle={toggleReminder}/>
            ) : (
              'No Tasks to show'
            )
          }
        </>
      )} />
      <Route path='/about' component={About}/>
      <Footer />
    </div>
    </Router>
  );
}



export default App;



