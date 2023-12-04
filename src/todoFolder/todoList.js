import TodoComp from './todo';
import React ,{ useState,useEffect,useRef,useReducer } from 'react';



    export default function TodoList({todo,dispatchTodo}){

        var todoColor = todo.complete ? 'text-green-500' : 'text-red-500';

        const handleDivClick = () => {
            dispatchTodo({ type: 'toggle', payload: { id: todo.id } });
          };

        return(
            <div class="hover:bg-slate-800  rounded-lg p-2" onClick={handleDivClick}>
                
                <span class="flex gap-2 justify-between border-b-2 border-b-white hover:border-b-slate-300"> 
                <div className="flex items-center gap-2">

                    <input class="h-5 w-5 rounded-xl border-gray-300 focus:ring-indigo-500 checked:bg-indigo-500 checked:border-transparent" type="checkbox" checked={todo.complete} onChange={()=>dispatchTodo({type:'toggle',payload : {id : todo.id}})}/>
                    <h2 class={`${todoColor} ml-2`  }> {todo.name}</h2>
                    <button type='button' class="justify-end"  onClick={()=>dispatchTodo({type:'remove',payload : {id : todo.id}})}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="flex justify-end w-5 h-5 text-slate-100 hover:w-4 hover:h-4 text-end">
  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
</svg></button>
</div>

                </span> 


   {/* <div class="mt-2"> 
            <button type='button' class="border-2 border-green-500 rounded p-2 py-1 bg-slate-50 font-serif font-medium ml-2 hover:bg-green-500 ease-linear duration-200" onClick={()=>dispatchTodo({type:'toggle',payload : {id : todo.id}})}>{(todo.complete) ? 'Not Completed' : 'Completed'}</button>
            <button type='button'  onClick={()=>dispatchTodo({type:'remove',payload : {id : todo.id}})}>Remove
</div> */}
</div>
        )

    }








    