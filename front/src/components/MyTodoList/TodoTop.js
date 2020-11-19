import React from 'react'
import './TodoTop.css';
import { Line } from 'rc-progress';
import { useSelector } from 'react-redux';

function TodoTop() {
    const { todoCountlist } = useSelector((state) => state.todolistReducer);
    console.log(todoCountlist)
    return (
        <div className="todo_top_container">
            <div className="study_todo">
                스터디 투두
            </div>
            <div className="study_my_ambition">
                나의 포부
            </div>
            <div>

            </div>
            <div className="study_today_objective">
                오늘의 달성도 {todoCountlist.completetodo}/{todoCountlist.uncompletetodo}
            </div>
            <div className="study_today_chart_area">
                <div className="study_today_lineChart"> 
                    <Line percent={todoCountlist.percompletetodo} strokeWidth="3"  strokeColor="#6A3DE6" />
                </div>
                <div className="study_today_lineChart_text">
                    잘하고있어요!
                </div>
            </div>
        </div>
    )
}

export default TodoTop
