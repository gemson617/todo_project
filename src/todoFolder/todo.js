import TodoList from './todoList';
import './style.css';

import React ,{ useState,useEffect,useRef,useReducer } from 'react';
// import TodoComp from './hooks/useReducer';

function CompEmpty(){
  return( <div style={{paddingTop:'2px'}}>
    <h2 className='compEmpty' style={{borderLeft : 'solid 5px #343deb',paddingLeft : '7px'}}>Add Something That You Don't Want To Forget</h2>
  </div>)
}

export default function TodoComp() {

  const [name, setName] = useState('');
  const [flashMessage, setFlashMessage] = useState({});

  const alertMsg = (msg,cls)=>{
    setFlashMessage({msg:msg,cls:cls});
  };

  const alertfunc=()=>{
    alert('todo cannot be null' )
  }
  
  const newTodo=(name)=>{
        return {id:Date.now(),name:name,complete:false};
  }
  
  const reducerFunc = (todos,action)=>{
    switch (action.type){
        case 'add':
          if(action.payload.name !== ''){
            alertMsg('Todo Added Successfully','success')
            return [...todos, newTodo(action.payload.name)]
          }else{
            alertMsg("Todo Can't be empty",'danger')
            return todos;
          }
        case 'toggle':
         return todos.map(todo=>{
            if(todo.id ===  action.payload.id){
              return {...todo, complete:!todo.complete}
            }
              return todo;
            
          })
        case 'remove':
          alertMsg('Todo Removed Successfully','success')
          return todos.filter(todo=> todo.id !== action.payload.id)
        default:
          return todos;
    }
  }

  const [todos, dispatchTodo] = useReducer(reducerFunc, [], () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatchTodo({ type: 'add', payload: { name: name } });
    setName('');
  }





  useEffect(()=>{
    if(flashMessage){
      var timer = setTimeout(()=>{
        setFlashMessage('')
      },3000);
      return () => {
        clearTimeout(timer);
      };
    }
  },[flashMessage]);

  // console.log(todos.length)

  let inputStyle = {
    height: '45px',
    width: '510px',
    border:'1px solid white',    
    borderLeft : '3px solid #008CBA', /* Single border bottom */
    backgroundColor: 'white', /* Transparent background */
    fontSize: '20px',
    borderRadius: '0', /* No border radius */
    margin: '5px',
    fontVariant: 'small-caps',
    padding: '7px',
    outline: 'none', /* Removing default focus outline */   
  };
  return (
    <div className='gradient-background'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '60px 0px 0px 60px' }}>
        <div style={{ flex: 1, marginRight: '20px'}}>
          <h1 style={{color:'#008CBA'}}>Add Todo</h1>

          <form onSubmit={handleSubmit}>
            <input type="text" style={inputStyle} placeholder='Enter Todo' value={name} name='name' onChange={e => setName(e.target.value)}  /><br></br>
            <input type="submit" value='submit' className='btnStyle' /><br></br>
          </form>
          {
            flashMessage ? 
              <div style={{paddingTop:'13px'}}>
                <div className={`flash-message ${flashMessage.cls}`}>
                    {flashMessage.msg}
                </div> 
              </div> : ''
          }
        </div>
        
        <div style={{ flex: 1 }}>
        <h1>
          <span  style={{color:'#008CBA', borderBottom: '2px solid #008CBA', paddingBottom: '2px'}}>Your TodoList</span>
        </h1>
        {/* {todos===0 && <CompEmpty/> } */}
        {todos.length === 0 ? <CompEmpty /> : ''}

          {todos.map(todo => {
              return <TodoList key={todo.id} todo={todo} dispatchTodo={dispatchTodo} />
          })}
        </div>
      </div>
      </div>

  );
}

