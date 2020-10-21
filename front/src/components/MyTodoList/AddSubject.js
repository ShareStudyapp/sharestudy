import React,{useState} from 'react'
import Select from 'react-select'

import chroma from 'chroma-js';
import {colourOptions} from './color';
import './AddSubject.css';

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
function AddSubject() {

    const [subject,setSubject] = useState('');
    const [subjectColor,setSubjectColor] = useState(colourOptions[2].color);
    const [subjectList,setSubjectList] = useState([]);
    const [reqSubject,setReqSubject] = useState('');

    /*dot과 colourStyles react-select 기본기능을 갖다쓰고있다.. */
    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',
      
        ':before': {
          backgroundColor: color,
          borderRadius: 10,
          content: '" "',
          display: 'block',
          marginRight: 8,
          height: 10,
          width: 10,
        },
    });
    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
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
    const addSubject = () =>{
        const subjectobj = {};
        subjectobj.label = subject;
        subjectobj.value=subjectColor;
        console.log(subjectobj);
        setSubjectList([subjectobj,...subjectList]);
        setSubject('');
    }
    const onChangeValue = (e) =>{
        setSubjectColor(e.color);
    }
    const onChangeSubjectValue = (e) =>{
        console.log(e.label)
        //setReqSubject();
    }
    const customStyles = {
        control: base => ({
            ...base,
            height: 55,
            minHeight: 35
          })
    }
    console.log(subjectList)
    return (
        <div>
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
                <div>
                    <input name="subject" value={subject} onChange={(e)=>setSubject(e.target.value)} style={{ color: subjectColor }} />
                </div>
                <button onClick={addSubject}>과목추가</button>
            </div>
            <Divider />
            내용 작성
            <div className="todo_area">
                <div className="selectbox">
                    <Select
                        styles={customStyles}
                        defaultValue={subjectList[0]}
                        label="Single select"
                        options={subjectList}
                        onChange={onChangeSubjectValue}
                    />
                </div>
                <div className="todotext_area">
                <TextField
                    id="outlined-full-width"
                    style={{ margin: 0 }}
                    placeholder="할 수 있는 투두를 적는게 좋아요"
                    helperText="Full width!"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    />
                </div>
            </div>
        </div>
    )
}

export default AddSubject
