import React,{useState,useCallback} from 'react'
import './TodoItem.css';
import { useSelector, useDispatch } from 'react-redux';
import {UPDATE_TODOCHECK_REQUEST,DELETE_TODOCHECK_REQUEST,LOAD_TODO_COUNT_REQUEST} from '../../reducers/todolist';
import { FaTrashAlt } from "react-icons/fa";

function TodoItem({key,todo,today}) {
    const dispatch = useDispatch();
    const { checked } = useSelector((state) => state.todolistReducer);
    // const [checked,setChecked] = useState(false);

    const onCheck = useCallback((todoId)=>{
        dispatch({
            type: UPDATE_TODOCHECK_REQUEST,
            data: todoId,
          });
    },[checked,today])

    const onDelete = useCallback((todoId)=>{
        if(window.confirm("삭제 하시겠습니까?")) {

            alert("확인버튼을 누르셨습니다.");
            dispatch({
                type: DELETE_TODOCHECK_REQUEST,
                data: todoId,
              });
            dispatch({
                type: LOAD_TODO_COUNT_REQUEST,
                data: today
            });
        }
        
    },[today])

    return (
        <div className="todoitems">
            <div className="highlighter_area" style={{backgroundColor:todo.highlighter}} ></div>
            <div className="todo_subject">{todo.subject.name}</div>
            <div className="todo_content" style={{ textDecoration: checked ? "line-through" : "" }}>{todo.todoContent}</div>
            <div className="checks">
                <input type="checkbox" id={"chk"+todo.id} checked={todo.checked} className="checkbox" onClick={()=>onCheck(todo.id)}/>
                <label for={"chk"+todo.id} className="label"></label>
            </div>
            <div>
                <FaTrashAlt onClick={()=>onDelete(todo.id)}/>
            </div>
        </div>
    )
}

export default TodoItem
