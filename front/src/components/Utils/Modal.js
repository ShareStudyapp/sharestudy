import React from 'react'
import './Modal.css';
import { useSelector } from 'react-redux';

function Modal({modalOpenValue,modalOpen,setModalOpen}) {
    const { likeList } = useSelector((state) => state.postReducer);
   
    let renderlist="";
    if(modalOpenValue==='likelist'){
        renderlist =  likeList.map((item,index)=>(
            <div>
                <div className="likelist_container">
                    <ul className="likelist">
                        <li className="first_li">
                            <div className="user_image_area"><img className="user_image" src={item.user.userProfileImage.src} /></div>
                            <div className="user_nickname_area">{item.user.nickname}</div>
                            <div className="follow_btn_area"><button className="follow_btn" /></div>
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
            <button type="button" class="likelist_back_btn" onClick={()=>setModalOpen(!modalOpen)}>&lt;뒤로가기</button>
                 {renderlist}
            </div>
        </>
    )
}

export default Modal
