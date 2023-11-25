import TodoComp from './todo';
import React ,{ useState,useEffect,useRef,useReducer } from 'react';



    export default function TodoList({todo,dispatchTodo}){

        // if(todo.complete == 'adsd'){
        //    var msg = <a href='#'>Its true</a>
        // }else{
        //    var msg = <a href='#'>Its false</a>
        // }
        return(
            <>
            <h2 className='todoList' style={{ color: todo.complete ? '#04AA6D' : 'red'}}>* {todo.name}</h2>
   
            <button type='button' className='btnToggle' onClick={()=>dispatchTodo({type:'toggle',payload : {id : todo.id}})}>{(todo.complete) ? 'Not Completed' : 'Completed'}</button>
            <button type='button' className='btnRemove' onClick={()=>dispatchTodo({type:'remove',payload : {id : todo.id}})}>Remove</button>

            </>
        )
    }








    // export default function TodoList({ todo, dispatchTodo }) {
    //     const handleToggle = () => {
    //       dispatchTodo({ type: 'toggle', payload: { id: todo.id } });
    //     };
      
    //     const handleRemove = () => {
    //       dispatchTodo({ type: 'remove', payload: { id: todo.id } });
    //     };
      
    //     return (
    //       <>
    //         <p style={{ color: todo.complete ? 'black' : 'red' }}>{todo.name}</p>
    //         <input
    //           type="checkbox"
    //           checked={todo.complete}
    //           onChange={handleToggle} // Use onChange for checkbox input
    //         />
    //         <button onClick={handleRemove}>Remove</button>
    //       </>
    //     );
    //   }
      

    // export default TodoList;