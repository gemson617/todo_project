import TodoList from "./todoList";
import "./style.css";

import React, { useState, useEffect, useRef, useReducer } from "react";
// import TodoComp from './hooks/useReducer';



function CompEmpty() {
  return (
    <div class="mt-2 flex"  >
      <span
        class="mt-2 mr-3 shadow-lg bg-gray-400 p-2 md:max-2xl:p-3 xl:p-3 rounded-lg  hover:bg-gray-300 duration-300 text-sm xs:text-sm sm:text-sm md:max-2xl:text-base font-serif text-slate-950">
        Add Something That You Don't Want To Forget
      </span>
    </div>
  );
}

export default function TodoComp() {
  const [name, setName] = useState("");
  const [ showCompleted, setShowCompleted] = useState(false);
  const [flashMessage, setFlashMessage] = useState({});


  
  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  
  const alertMsg = (msg, cls) => {
    setFlashMessage({ msg: msg, cls: cls });
  };

  const alertfunc = () => {
    alert("todo cannot be null");
  };

  const newTodo = (name) => {
    return { id: Date.now(), name: name, complete: false };
  };

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth' // This enables smooth scrolling
  //   });
    
  const reducerFunc = (todos, action) => {
    switch (action.type) {
      case "add":
        if (action.payload.name !== "") {
          alertMsg("Todo Added Successfully", "success");
          return [...todos, newTodo(action.payload.name)];
        } else {
          alertMsg("Todo Can't be empty", "danger");
          return todos;
        }
      case "toggle":
        return todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, complete: !todo.complete };
          }
          
          return todo;
        });
      case "remove":
        alertMsg("Todo Removed Successfully", "success");
        
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        return todos.filter((todo) => todo.id !== action.payload.id);
        
        case "removeCompleted":
          alertMsg("Completed Todos Removed Successfully", "success");
          // if(showCompleted){
          //   setShowCompleted(false);
          // }
          // (showCompleted) ? setShowCompleted(false) : '';

          setShowCompleted(showCompleted ? false : showCompleted);

          
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          
          return todos.filter((todo) => todo.complete !== true);
        
      default:
        return todos;
    }
  };


  

  const [todos, dispatchTodo] = useReducer(reducerFunc, [], () => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatchTodo({ type: "add", payload: { name: name } });
    setName("");
  }

  useEffect(() => {
    if (flashMessage) {
      var timer = setTimeout(() => {
        setFlashMessage("");
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [flashMessage]);


  // function clearCompleted(){
  //   alert('nothing')
  // }

  const clearCompleted = (event) => {
    event.preventDefault();
    alert("todo cannot be null");
  };

  const hasCompletedTodos = todos.some(todo => todo.complete === true);


  return (

    <div className="bg-fixed gradient-background">
      
      <div class="flex items-center flex-col m-1 w-full  pt-10 pl-10 pr-4">
        
        <div class="">
          
          <h1 class="text-2xl text-teal-600 sm:max-2xl:text-3xl font-semibold font-sans underline">
            Add Todo
          </h1>
        <form onSubmit={handleSubmit}>
            <div class="w-96 min-w-full">
                <input type="text" class="w-96 p-2 m-2 rounded border-l-2 border-l-emerald-700 focus:border-l-0 focus:border-b-2 focus:border-b-blue-500  focus:outline-none font-sans text-slate-900 font-semibold uppercase shadow-xl"  placeholder="Enter Todo" value={name} name="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <input type="submit" value="submit" class=" border-2 border-green-400 rounded p-2 py-1 bg-slate-50 font-serif font-medium ml-2 hover:bg-green-400 ease-linear duration-300"  />
          
          

        </form>


          {flashMessage ? (
            <div style={{ paddingTop: "13px" }}>
              <div class={`p-2 m-2 rounded text-slate-950 font-sans font-semibold flex-nowrap w-96 md:w-80 lg:w-96 ${flashMessage.cls}`}>
                {flashMessage.msg}
              </div>
            </div>
        ) : (
            null
          )}  

{/* {`flash-message success ${flashMessage.cls}`} */}

        </div>

        <div class="mt-4 mb-6 ">
          
          <h2>
            <span class="mt-0 text-2xl text-left text-teal-600 sm:max-2xl:text-3xl font-semibold font-sans underline  ">
              Your TodoList
            </span>
          </h2>

          {todos.length === 0 ? <CompEmpty /> : ""}




        <div class="fixClass relative text-white mx-2 p-2 -mb-2 mt-2 rounded w-full bg-slate-800 flex gap-x-7 items-center justify-between">
          <div>
            <span>{todos.length} Todos</span>
          </div>
          <div class="flex justify-center -space-x-2">
            {/* <button class="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded pr-4">All</button> */}
            <button class="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded" onClick={toggleShowCompleted}> {showCompleted ? 'Show All' : 'Not Completed'} </button>
          </div>
          <div>
            <a class={`px-3 py-1 border-b-2 hover:cursor-pointer border-slate-800 hover:border-b-red-500  text-white ${!hasCompletedTodos ? 'pointer-events-none opacity-50' : ''} `}  onClick={() => dispatchTodo({ type: 'removeCompleted' })}>Clear Completed</a>
          </div>
        </div>

              
          <div class="container ml-2 text-md tracking-widest font-semibold text-lg p-4 left-0 mt-0 w-full rounded-lg align-items-left bg-slate-900 max-h-80" style={{ overflowY: 'auto', paddingRight: '20px' }}>
         
              <div class="scrollable-container grid grid-flow-row grid-rows-2">

                {todos.map((todo) => (
                  // <div  key={todo.id} style={{ display: showCompleted || !todo.completed ? 'block' : 'none' }}>
                      <TodoList key={todo.id} todo={todo} dispatchTodo={dispatchTodo} showCompleted={showCompleted} />
                  // </div>
                ))}

                
              
            </div>
           
          </div>

          
        </div>
      </div>
    </div>
  );
}
