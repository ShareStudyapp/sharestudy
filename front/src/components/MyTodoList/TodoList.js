import React from 'react'
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
function TodoList() {
    const { mainTodolist } = useSelector((state) => state.todolistReducer);
    
    console.log('ffff',mainTodolist)
    return (
        <div>
            {mainTodolist.map(todo=>(
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}

export default TodoList
