import TodoComp from './todo';
import React ,{ useState,useEffect,useRef,useReducer } from 'react';



    export default function TodoList({todo,dispatchTodo}){




        return(
            <div class="">
                
                <span class="flex gap-2 text-"> 
                    <input  type="checkbox" checked={todo.complete} onChange={()=>dispatchTodo({type:'toggle',payload : {id : todo.id}})}/>
                    <h2 class={`text-${todo.complete ? 'black' : 'green'}`}> {todo.name}</h2>
                </span> 



   {/* <div class="mt-2"> 
            <button type='button' class="border-2 border-green-500 rounded p-2 py-1 bg-slate-50 font-serif font-medium ml-2 hover:bg-green-500 ease-linear duration-200" onClick={()=>dispatchTodo({type:'toggle',payload : {id : todo.id}})}>{(todo.complete) ? 'Not Completed' : 'Completed'}</button>
            <button type='button' class="border-2 border-red-600 rounded p-2 py-1 bg-slate-50 font-serif font-medium ml-2 hover:bg-red-600 ease-linear duration-200 hover:text-white" onClick={()=>dispatchTodo({type:'remove',payload : {id : todo.id}})}>Remove</button>
</div> */}
</div>
        )

    }








    