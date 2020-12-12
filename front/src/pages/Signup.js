import React, { useState, useCallback,useEffect} from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST,USER_RESET } from '../reducers/user';
import { Select } from 'antd';

import './Signup.css';

const { Option } = Select;
function Signup({history}) {
    //const google_info = window.sessionStorage.getItem('google_information');
    const google_info = JSON.parse(sessionStorage.getItem('google_information'))
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    //const [userid, onChangeUserid] = useInput('');
    //const [nickname, onChangeNickname] = useInput('');
    //const [password, onChangePassword] = useInput('');
    //const [email,onChangeEmail] = useInput('');
    const [userid, setUserid] = useState('');
    const [nickname,setNickname] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [sex,onChangeSex] = useState('M');
    const [gtoken,setGtoken] = useState('');
    const [accountType,setAccountType] = useState('');
    const { signUpLoading,signUpDone,signUpError,logInLoading } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    
    useEffect(()=>{
      
      if(google_info !== null){

        setEmail(google_info.profileObj.email);
        setNickname(google_info.profileObj.name);
        setGtoken(google_info.tokenId);
        setAccountType('google');
      }
      
    },[])

    useEffect(() => {
      

      if (signUpDone) {
        window.sessionStorage.removeItem('google_information')
        dispatch({
          type: USER_RESET
        }) 
        history.push('/');
        alert('가입되었습니다.');
      }
    }, [signUpDone]);
    useEffect(() => {
      if (signUpError) {
        
        return;
      }
      if(logInLoading){
        dispatch({
          type: USER_RESET
        }) 
      }
    }, [signUpError,logInLoading]);

    const onSubmit = useCallback(() => {
      
      const role = ["user"];
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      return dispatch({
        type: SIGN_UP_REQUEST,
        data: {
          userid,
          password,
          nickname,
          email,
          sex,
          role,
          gtoken,
          accountType
        },
      });
    }, [password, passwordCheck,sex,userid,nickname,gtoken,accountType]);
  


    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);
    
  
    return (
    <>
        <Form onFinish={onSubmit} style={{ padding: 10,marginTop:120 }}>
            <h1>회원가입</h1>
            <div className="user-container">
              <div>
                <br />
                <Input name="user-email" placeholder="이메일을 입력해주세요" value={email} required onChange={({ target: { value } }) => setEmail(value)} />
              </div>
              <div>
                <br />
                <Input name="user-nick" placeholder="닉네임을 입력해주세요" value={nickname} required onChange={({ target: { value } }) => setNickname(value)} />
              </div>
              <div>
                <br />
                <Input name="user-userid" placeholder="아이디를 입력해주세요" value={userid} required onChange={({ target: { value } })=>setUserid(value)} />
              </div>
              <div>
              {/* <Select defaultValue="M" style={{ width: 90 }} onChange={onChangeSex}>
                <Option value="M">남자</Option>
                <Option value="F">여자</Option>
              </Select> */}
              </div>
              <div>
              </div>
              <div>
                {/* <label htmlFor="user-password">비밀번호</label> */}
                <br />
                <Input name="user-password" placeholder="비밀번호를 입력해주세요" type="password" value={password} required onChange={({ target: { value } }) => setPassword(value)} />
              </div>
              <div>
                  {/* <label htmlFor="user-password-check">비밀번호체크</label> */}
                <br />
                <Input
                    name="user-password-check"
                    type="password"
                    value={passwordCheck}
                    required
                    onChange={onChangePasswordCheck}
                    placeholder="비밀번호를 입력해주세요"
                />
                {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
              </div>
              
              <div style={{ marginTop: 10 }}>
                <Button type="primary" style={{width:"100%",backgroundColor:"#C5C5C5"}} htmlType="submit" className="signup_btn" loading={signUpLoading}>확인</Button>
              </div>
            </div>
        </Form>
    </>
    )
}

export default Signup
