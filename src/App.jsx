import { useState , useEffect } from "react";
import Navbar from "./assets/components/Navbar";
import { v4 as uuidv4 } from 'uuid';

// import './App.css'

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'));
      setTodos(todos)
    }
  }, []);
   
  const savetoLS = (params) => { 
    localStorage.setItem('todos',JSON.stringify(todos))
  }
  const toggleFinished = (e) => { 
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    savetoLS();
  }
  const handleDel = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos);
    savetoLS()
  };
  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    savetoLS()
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => { 
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    savetoLS()
   }

  return (
    <>
      <Navbar />
      <div className="container bg-gray-300 min-h-[90vh] ">
        <div className="box max-w-2xl bg-green-300 m-auto flex flex-col items-center gap-3 min-h-[80vh]">
          <h1 className="font-bold text-4xl text-purple-600">Add Your Tasks</h1>
          <div className="flex gap-2 w-full px-10">
            <input
              onChange={handleChange} placeholder="Write Your Tasks!"
              value={todo}
              className="w-full bg-white size-11 rounded-2xl pl-3"
              type="text"
            />
            <button onClick={handleAdd} disabled={todo.length<=2} className="bg-purple-600 w-20 disabled:bg-purple-300 rounded-xl">
              Add
            </button>
          </div>
          <h1 className="font-bold text-3xl text-purple-500">Your Todos</h1>
          <div className="flex gap-2 text-xl">
            <input onChange={toggleFinished} type="checkbox" checked={showFinished} className="text-3xl" />Show Finished Tasks
          </div>
          <div className="todos flex flex-col gap-2 w-full px-10">
            {todos.length ===0 && <div className="">No Todos</div>}
            {todos.map((item) => {
              return ((showFinished || !item.isCompleted ) && <div key={item.id} className="todo flex gap-2 max-h-11 border-black border-2 py-2 px-2 rounded-2xl">
                <input name = {item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted?"line-through text w-full text-lg overflow-hidden ":"text w-full text-lg overflow-hidden "}>{item.todo}</div>   
                <div className="buttons flex gap-3">
                  <span
                    onClick={(e)=>handleEdit(e, item.id)}
                    className=" cursor-pointer material-symbols-outlined"
                  >
                    edit
                  </span>
                  <span
                    onClick={(e)=>handleDel(e,item.id)}
                    className=" cursor-pointer material-symbols-outlined"
                  >
                    delete
                  </span>
                </div>
              </div>)
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
