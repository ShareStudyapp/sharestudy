import React from 'react'
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
function TodoList({today}) {
    const { mainTodolist } = useSelector((state) => state.todolistReducer);
    
    console.log('ffff',mainTodolist)
    return (
        <div>
            <span>TO DO </span>{today}
            <div>수정</div>
            {mainTodolist.map(todo=>(
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </div>
    )
}

export default TodoList
