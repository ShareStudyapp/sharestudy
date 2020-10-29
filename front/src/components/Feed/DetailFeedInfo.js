import React from 'react'
import '../Feed/PostCard.css';

function DetailFeedInfo() {
    return (
        <div>
            <div className="FeedContainer" >
                <div className="Feed_area">
                    <div className="FeedUser">
                    <div className="user_zone">
                    
                        
                        <span className="user_name"></span>
                    </div>
                    </div>
                    <div className="Feed_Content"> 
                    <div className="content_image_zone">
                        
                    </div>
                    <div className="content_zone">df
                        {/* {editMode
                        ?<div><PostCardContent content={post.content} onChangePost={onChangePost} onCancelUpdate={onCancelUpdate} /></div>
                        :post.content} <span>더보기</span> */}
                    </div>
                    <div className="content_feature">
                        <div className="bar-item like">
                        {/* {buttonloading?<div style={{marginLeft:15}}><Spinner /></div>
                        :liked 
                        ?<FaHeart className="bar-icon" onClick={onUnlike}/>
                        :<FaRegHeart className="bar-icon" onClick={onLike}/>}
                        <div onClick={() => openLikeModal(post.id)}>{post.totallike}</div>
                        {modalOpen?<><Modal userInfo={userInfo} modalOpenValue={modalOpenValue} modalOpen={modalOpen} setModalOpen={setModalOpen}/></>:""} */}
                        </div>
                        {/* <FaRegCommentAlt className="bar-icon" onClick={()=>onToggleComment(post.id)} /> */}
                        {/* <Link to={`/${post.id}`}><FaRegCommentAlt className="bar-icon" /></Link> */}
                        <div className="bar-item comment"></div>
                    </div>
                            {/* { post.user.id === userInfo.id
                            ? (
                            <>
                                <Button onClick={onClickUpdate}>수정</Button>
                                <Button type="danger" loading={removePostLoading} onClick={()=>onRemovePost(post)}  >삭제</Button>
                            </>
                            )
                            : <Button onClick={testClick}>신고</Button>} */}
                    <div>
                        
                    </div>
                    <div>
                    {/* {commentFormOpened&&<CommentForm post={post} />}
                    {commentFormOpened && postComment.map((item,index)=>(
                        <>
                            <Comment
                            author={item.user.nickname}
                            avatar={(
                                // <Link href={{ pathname: '/user', query: { id: item.user.id } }} as={`/user/${item.user.id}`}>
                                <a><Avatar>{item.user.nickname}</Avatar></a>
                                // </Link>
                            )}  
                            content={<ReplyContent replyeditMode={replyeditMode} replyid={item.id} content={item.content} userid={item.user.id} onChangeReplyPost={onChangeReplyPost} onCancleReplyUpdate={onCancleReplyUpdate} />}
                                
                            />
                            { item.user.id === userInfo.id
                            ?(
                            <>
                                <Button onClick={()=>onClickReplyUpdate(item.id)} >수정</Button>
                                <Button onClick={()=>onClickReplyDelete(item.id)} >삭제</Button>
                            </>
                            ):<>회원만 수정가능</>}
                        </>                  
                    ))} */}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailFeedInfo
