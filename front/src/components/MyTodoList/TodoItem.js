import React from 'react'
import './TodoItem.css';

function TodoItem({key,todo}) {
    return (
        <div>
            <div className="highlighter_area" style={{backgroundColor:todo.highlighter}} ></div>
            <div>{todo.subject.name}</div>
            <div>{todo.todoContent}</div>
        </div>
    )
}

export default TodoItem
