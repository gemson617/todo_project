import TodoComp from './todo';
import React ,{ useState,useEffect,useRef,useReducer } from 'react';



    export default function TodoList({todo,dispatchTodo,showCompleted}){

        var todoColor = todo.complete ? 'text-green-500' : 'text-red-500';

        const handleDivClick = () => {
            setIsClicked(true);
            dispatchTodo({ type: 'toggle', payload: { id: todo.id } });

            setTimeout(() => {
                setIsClicked(false);        //after 4milli seconds isClicked will be false
            }, 400); 
          };

          const handleDelClick = () => {
            setIsClicked(true);
            
            setTimeout(() => {
                dispatchTodo({ type: 'remove', payload: { id: todo.id } });
              }, 400);                      //after 4milli seconds the todo will be removed

              setTimeout(() => {
                setIsClicked(false);        //after 4milli seconds isClicked will be false
            }, 400); 
            
          };
          
          const [isClicked, setIsClicked] = useState(false);

        
          
        return(
            <div className={`p-2 rounded-lg hover:bg-slate-800 ${isClicked ? 'animate-wave' : ''}`} onClick={handleDivClick} style={{ display: !showCompleted || todo.complete ? 'block' : 'none' }}>
                <span className="flex justify-between gap-2 overflow-hidden duration-700 ease-linear border-b-2 hover:break-all border-b-white hover:border-b-slate-300"> 
                    <div className="flex items-center gap-2">
                        <input className="border-gray-300 rounded-xl focus:ring-indigo-500 checked:bg-indigo-500 checked:border-transparent" type="checkbox" checked={todo.complete} onClick={() => dispatchTodo({ type: 'toggle', payload: { id: todo.id } })} />
                        <h2 className={`${todoColor} ml-2 `}  data-completed={todo.complete}>{todo.name}</h2>
                    </div>
                    <button type='button' className="flex items-center ml-2" onClick={handleDelClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-slate-100 hover:w-5 hover:h-5">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                        </svg>
                    </button>
                </span>
            </div>
        )

    }
    
   {/* <div class="mt-2"> 
            <button type='button' class="border-2 border-green-500 rounded p-2 py-1 bg-slate-50 font-serif font-medium ml-2 hover:bg-green-500 ease-linear duration-200" onClick={()=>dispatchTodo({type:'toggle',payload : {id : todo.id}})}>{(todo.complete) ? 'Not Completed' : 'Completed'}</button>
            <button type='button'  onClick={()=>dispatchTodo({type:'remove',payload : {id : todo.id}})}>Remove
</div> */}







    