import React,{useCallback,useState} from 'react'
import './Modal.css';
import { useSelector,useDispatch } from 'react-redux';
import {FOLLOW_REQUEST,FOLLOW_CANCLE_REQUEST} from '../../reducers/user';

function Modal({userInfo,modalOpenValue,modalOpen,setModalOpen}) {
    const { likeList } = useSelector((state) => state.postReducer);
    const { followInfo } = useSelector((state) => state.userReducer);
    const [buttonloading,setButtonloading] = useState(false);
    const dispatch = useDispatch();
    let renderlist="";
    const follow = useCallback((id) => {
        if (!userInfo.id) {
          return alert('로그인이 필요합니다.');
        }
        setButtonloading(true);
   
        setTimeout(()=>{
          setButtonloading(false);
        },500)
        console.log(id)
        return dispatch({
          type: FOLLOW_REQUEST,
          data: id,
        }); 
      }, [userInfo.id]);
      const followCancle = useCallback((id) => {
        if (!userInfo.id) {
          return alert('로그인이 필요합니다.');
        }
        setButtonloading(true);
  
        setTimeout(()=>{
          setButtonloading(false);
        },500)
        return dispatch({
          type: FOLLOW_CANCLE_REQUEST,
          data: id,
        }); 
      }, [userInfo.id]);
    // const liked = likeList.map((t)=>t.find(data=>console.log(data)))
    // const follow_cp = likeList.some((t)=>t.user.id === followInfo.userkey)
    console.log(followInfo)
    if(modalOpenValue==='likelist'){
        renderlist =  likeList.map((item,index)=>(
            <div>
                <div className="likelist_container">
                    <ul className="likelist">
                        <li className="first_li" key={item.id}>
                            <div className="user_image_area"><img className="user_image" src={item.user.userProfileImage.src} /></div>
                            <div className="user_nickname_area">{item.user.nickname}</div>
                            <div className="follow_btn_area">
                                {userInfo.id?item.user.id!==userInfo.id?item.tempFollow || followInfo.find(e=>e.userkey===item.user.id)?<button className="following_btn" onClick={()=>followCancle(item.user.id)} />:<button className="follow_btn" onClick={()=>follow(item.user.id)} />:"":""}
                                
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            ))
    }
    return (
        <>
            <div className="modalPopup_bg" onClick={()=>setModalOpen(!modalOpen)} />
            
            <div className="modalPopup">
            <button type="button" className="likelist_back_btn" onClick={()=>setModalOpen(!modalOpen)}>&lt;뒤로가기</button>
                 {renderlist}
            </div>
        </>
    )
}

export default Modal
