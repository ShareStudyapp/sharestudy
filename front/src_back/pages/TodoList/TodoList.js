import React,{useState}  from "react";
import { render } from "react-dom";
import TodoListTemplate from "../../components/TodoList/TodoListTemplate";
import Calender from '../../components/TodoList/Calender';
import { useDispatch,useSelector } from 'react-redux';
import { ADD_PLAN_REQUEST } from '../../reducers/todolist';

function  TodoList(){
let today = new Date();   
  
const defaultCalenderValue = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
const todolist= [
    { id: 0, todoName: "react 공부", fontColor: "#ff7575", checked: true },
    { id: 1, todoName: "숙제하기", fontColor: "#7cb5ec", checked: false },
    { id: 2, todoName: "양치하기", fontColor: "#62c144", checked: false },
    { id: 3, todoName: "일기쓰기", fontColor: "#888888", checked: false }
  ];
  const dispatch = useDispatch();
  const [id,setId] = useState(0);
  const [input,setInput] =useState('');
  const [pickColor,setPickColor] = useState('#888888');
  const [todo,setTodo] = useState([]);
  const [todoname,setTodoname] = useState('');
  const [fontColor,setFontColor] = useState('');
  const [checked,setChecked] = useState(false);
  const [selectedDay, setSelectedDay] = useState(defaultCalenderValue);
  const {mainTodolist} = useSelector((state) => state.todolistReducer);
  console.log(mainTodolist)
  const handleChange = e => {
    // this.setState({
    //   input: e.target.value
    // });
    setInput(e.target.value);
  };

  const handleCreate = () => {
    setInput('');
    // setTodo(todo.concat({
    //     // id: id++,
    //     todoName: input,
    //     fontColor: pickColor,
    //     checked: false
    // }))
    const CalenderDate=selectedDay.year+""+selectedDay.month+""+selectedDay.day
    
    console.log(CalenderDate)
    let todoList={};
    todoList.savedDate=CalenderDate;
    todoList.todoContent=input;
    todoList.fontColor=pickColor;
    todoList.checked=checked;
    //TodoList.checked=false;
    dispatch({
      type: ADD_PLAN_REQUEST,
      todoList,
    });
    // this.setState({
    //   input: "",
    //   todo: todo.concat({
    //     id: this.id++,
    //     todoName: input,
    //     fontColor: pickColor,
    //     checked: false
    //   })
    // });
  };
  const onChangeDate=(e)=>{
    setSelectedDay(e.target.value)
  }
  const handlePress = e => {
    if (e.key === "Enter") {
        handleCreate();
    }
  };

  const handleToggle = id => {
    // const { todo } = this.state;
    const index = todo.findIndex(todos => todos.id === id);

    const selected = todo[index];
    const nextTodo = [...todo];

    nextTodo[index] = {
      ...selected,
      checked: !selected.checked
    };
    setTodo(nextTodo);
    // this.setState({
    //   todo: nextTodo
    // });
  };

  const handleRemove = id => {
    // const { todo } = this.state;

    // this.setState({
    //   todo: todo.filter(todos => todos.id !== id)
    // });
    //setTodo(todo.filter(todos => todos.id !== id))
    console.log(id)
  };

  const handleColorChange = color => {
    //const { todo } = this.state;
    let colorSet = "";

    switch (color) {
      case "red":
        colorSet = "#ff7575";
        break;
      case "blue":
        colorSet = "#7cb5ec";
        break;
      case "green":
        colorSet = "#62c144";
        break;
      case "black":
        colorSet = "#888888";
        break;
      default:
        colorSet = "#888888";
        break;
    }

    setPickColor(colorSet);
    // this.setState({
    //   pickColor: colorSet
    // });
  };


    // const { todo, input, pickColor } = this.state;
    // const {
    //   handleCreate,
    //   handleChange,
    //   handlePress,
    //   handleToggle,
    //   handleRemove,
    //   handleColorChange
    // } = this;

    return (
      <div style={{display:"flex"}}>
        <Calender defaultCalenderValue={defaultCalenderValue} />
        <TodoListTemplate
          todo={mainTodolist}
          onCreate={handleCreate}
          onChange={handleChange}
          onPress={handlePress}
          onToggle={handleToggle}
          onRemove={handleRemove}
          value={input}
          onColorChange={handleColorChange}
          pickColor={pickColor}
        />
      </div>
    );
  
}
export default TodoList;
