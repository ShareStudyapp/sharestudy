import React,{useCallback,useState} from 'react'
import './Modal.css';
import { useSelector,useDispatch } from 'react-redux';
import {FOLLOW_REQUEST,FOLLOW_CANCLE_REQUEST} from '../../reducers/user';

function Modal({userInfo,modalOpenValue,modalOpen,setModalOpen}) {
    const { likeList } = useSelector((state) => state.postReducer);
    const { followingList } = useSelector((state) => state.userReducer);
    const { followInfo } = useSelector((state) => state.userReducer);
    const { followerList } = useSelector((state) => state.userReducer);
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
    if(modalOpenValue==='likelist'){
        renderlist =  likeList.map((item,index)=>(
              <div>
                <div className="likelist_container">
                    <ul className="likelist">
                        <li className="first_li" key={item.id}>
                            <div className="user_image_area"><img className="user_image" src={item.user.userProfileImage.src} /></div>
                            <div className="user_nickname_area">{item.user.nickname}</div>
                            <div className="follow_btn_area">
                              {userInfo.id?
                                item.user.id!==userInfo.id?
                                item.tempFollow || followInfo.find(e=>e.userkey===item.user.id)?
                                    <button className="following_btn" onClick={()=>followCancle(item.user.id)} />:
                                    <button className="follow_btn" onClick={()=>follow(item.user.id)} />
                                  :""
                              :""}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            ))
    }
    if(modalOpenValue==='followerList'){
      renderlist =  followerList.map((item,index)=>(
          <div>
              <div className="likelist_container">
                    <ul className="likelist">
                        <li className="first_li" key={item.id}>
                            <div className="user_image_area"><img className="user_image" src={item.fromUser.userProfileImage.src} /></div>
                            <div className="user_nickname_area">{item.fromUser.nickname}</div>
                            <div className="follow_btn_area">
                              {userInfo.id?
                                item.tempFollow || followInfo.find(e=>e.userkey===item.fromUser.id)?
                                  <button className="following_btn" onClick={()=>followCancle(item.fromUser.id)} />
                                  :<button className="follow_btn" onClick={()=>follow(item.fromUser.id)} />
                              :""}                             
                            </div>
                        </li>
                    </ul>
                </div>
          </div>
          ))
    }
    if(modalOpenValue==='followingList'){
      renderlist =  followingList.map((item,index)=>(
          <div>
              <div className="likelist_container">
                    <ul className="likelist">
                        <li className="first_li" key={item.id}>
                            <div className="user_image_area"><img className="user_image" src={item.toUser.userProfileImage.src} /></div>
                            <div className="user_nickname_area">{item.toUser.nickname}</div>
                            <div className="follow_btn_area">
                              {userInfo.id?
                                followInfo.find(e=>e.id===item.toUser.id)?
                                  <button className="following_btn" onClick={()=>followCancle(item.toUser.id)} />
                                  :<button className="follow_btn" onClick={()=>follow(item.toUser.id)} />
                              :""}                              
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
