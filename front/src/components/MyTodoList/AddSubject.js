import React,{useState} from 'react'
import Select from 'react-select'

import chroma from 'chroma-js';
import './AddSubject.css';
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { ADD_PLAN_REQUEST,LOAD_PLAN_REQUEST } from '../../reducers/todolist';
import axios from 'axios';
function AddSubject({today,colourOptions}) {
    const dispatch = useDispatch();
    const [subject,setSubject] = useState('');
    const [subjectColor,setSubjectColor] = useState(colourOptions[1].color);
    const [subjectList,setSubjectList] = useState([]);
    const [todoSubject,setTodoSubject] = useState('');
    const [todoColor,setTodoColor] = useState('') 
    const [todolists,setTodolists] = useState([]);

    const [todo,setTodo] = useState([]);

    /*dot과 colourStyles react-select 기본기능을 갖다쓰고있다.. */
    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',
        height:'45px',
        backgroundColor:"#F6F4FC",
      
        ':before': {
          backgroundColor: "#F6F4FC",
          borderRadius: 10,
          content: '" "',
          display: 'block',
          marginRight: 8,
          height: 10,
          width: 10,
        },
    });
    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: '#F6F4FC' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
          const color = chroma(data.color);
          return {
            ...styles,
            backgroundColor: isDisabled
              ? null
              : isSelected
              ? data.color
              : isFocused
              ? color.alpha(0.1).css()
              : null,
            color: isDisabled
              ? '#ccc'
              : isSelected
              ? chroma.contrast(color, 'white') > 2
                ? 'white'
                : 'black'
              : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
            
            ':active': {
                
              ...styles[':active'],
              backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
            },

          };
        },
        input: styles => ({ ...styles, ...dot() }),
        placeholder: styles => ({ ...styles, ...dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };
    //아래 셀렉트박스 
    const customStyles = {
        option: (styles, { data,isFocused, isSelected }) => ({
            ...styles,
            cursor: isFocused ? data.value : data.value,
            color: isSelected ? data.value : data.value,
            padding: 20,
          }),
        control: base => ({
            ...base,
            width:150,
            height: 55, 
            minHeight: 35,
            backgroundColor: '#F6F4FC'
          }),
        input: styles => ({ ...styles, ...dot() }),
        placeholder: styles => ({ ...styles, ...dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
          
    }
    const onChangeValue = (e) =>{
        setSubjectColor(e.color);
    }
    const onChangeSubjectValue = (e) =>{
        
        setTodoColor(e.value);//value를 쓴이유는 react-select 밸류값으로 컬러가 들어간다
        setTodoSubject(e.label);//라벨값이 디스플레이 값이다.
    }
    const addSubject = () =>{
        const subjectobj = {};
        subjectobj.label = subject;
        subjectobj.value=subjectColor;
        setSubjectList([subjectobj,...subjectList]);
        setSubject('');

    }
    
    const addTodo = () =>{

        // if(todoSubject === ''){
        //     alert('과목을 먼저 선택해주세요');
        //     return;
        // }
    
        const TodoListReq = {};
        TodoListReq.color = todoColor;
        TodoListReq.name = todoSubject;
        TodoListReq.todoContent = todo;
        TodoListReq.savedDate = today;
        // setTodolists([TodoListReq,...todolists]);
        dispatch({
            type: ADD_PLAN_REQUEST,
            data: TodoListReq
          });
        setTodo('');
        // axios.post('/user/todo',TodoListReq)
        //     .then(function(res){
        //         console.log(res);
        //     })

    }
    console.log(todolists)
    const todos = todolists.map(todo => <li className="tt">{todo.todo}</li>);
    return (
        <div className="addsubject_container">
            과목 추가하기 <br />
            <div className="add_area">
                <div className="selectbox">
                    <Select
                        defaultValue={colourOptions[2]}
                        label="Single select"
                        options={colourOptions}
                        styles={colourStyles}
                        onChange={onChangeValue}
                    />
                </div>
                <div >
                    <input name="subject" className="subject_input" placeholder="과목 추가하기" value={subject} onChange={(e)=>setSubject(e.target.value)}  />
                </div>
                <button className="subject_add_btn" onClick={addSubject}>과목추가</button>
            </div>
            <Divider />
            <div className="today_font">오늘은</div>
            <div className="todo_area">
                <div className="selectbox">
                    <Select
                        styles={customStyles}
                        defaultValue={subjectList[0]}
                        defaultValue={{ label: "과목 선택",color: 'red' }}
                        options={subjectList}
                        onChange={onChangeSubjectValue}
                    />
                </div>
                <div className="todo_area_font">
                    을
                </div>
            </div>
            <div className="todotext_area">
                    <input 
                        className="todo_input" 
                        value={todo} 
                        onChange={(e)=>setTodo(e.target.value)} 
                        style={{ color:'black',fontWeight:'bold' }} 
                        placeholder="할 수 있는 투두를 적는게 좋아요" 
                        />
                    <p className="todo_input_font">
                    만큼 할래요
                    </p>
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',height:'15vh'}}>
                <button className="addsubjct_btn" onClick={addTodo}>추가하기</button>
            </div> 
            <ul> 
                {todos}
            </ul>
            {/* <button onClick={addTodoList}>내 투두 올리기</button> */}
        </div>
    )
}

export default AddSubject
