import React,{useCallback,useState} from 'react'
import './Modal.css';
import { useSelector,useDispatch } from 'react-redux';
import {FOLLOW_REQUEST} from '../../reducers/user';

function Modal({userInfo,modalOpenValue,modalOpen,setModalOpen}) {
    const { likeList } = useSelector((state) => state.postReducer);
    const { followInfo } = useSelector((state) => state.userReducer);
    const [buttonloading,setButtonloading] = useState(false);
    const dispatch = useDispatch();
    let renderlist="";
    console.log(likeList)
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
    if(modalOpenValue==='likelist'){
        renderlist =  likeList.map((item,index)=>(
            <div>
                <div className="likelist_container">
                    <ul className="likelist">
                        <li className="first_li" key={item.id}>
                            <div className="user_image_area"><img className="user_image" src={item.user.userProfileImage.src} /></div>
                            <div className="user_nickname_area">{item.user.nickname}</div>
                            <div className="follow_btn_area">
                                {item.user.follow.map((followitem,index)=>(
                                    followitem.toUser.id===userInfo.id?<button className="following_btn" />:<button className="follow_btn" onClick={()=>follow(item.user.id)} />
                                ))}
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
