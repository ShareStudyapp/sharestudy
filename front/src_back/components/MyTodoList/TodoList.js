import React from 'react'
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import './TodoList.css';
function TodoList({today}) {
    const { mainTodolist } = useSelector((state) => state.todolistReducer);
    
    return (
        <div className="todolist_wrapper">
            <span>TO DO </span>{today}
            <div>수정</div>
            {mainTodolist.map(todo=>(
                <TodoItem key={todo.id} todo={todo} today={today} />
            ))}
        </div>
    )
}

export default TodoList
