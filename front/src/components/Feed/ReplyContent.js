import React,{ useState, useCallback, useEffect } from 'react'
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';
const { TextArea } = Input;
function ReplyContent({replytmp,replyeditMode,replyid,content,userid,onCancleReplyUpdate,onChangeReplyPost}) {
    const [replyeditText, setReplyeditText] = useState(content);
    const { updateCommentDone } = useSelector((state) => state.postReducer);

    const onChangeText = useCallback((e) => {
        setReplyeditText(e.target.value);
    });
    useEffect(() => {
      if (updateCommentDone) {
        onCancleReplyUpdate();
      }
    }, [updateCommentDone]);
    return (
        <div>
            {replyeditMode
            ? (
              <>
                <TextArea value={replyeditText} onChange={onChangeText} />
                <Button.Group>
                  <Button onClick={onChangeReplyPost(replyid,replyeditText)}>수정</Button>
                  <Button type="danger" onClick={onCancleReplyUpdate}>취소</Button>
                </Button.Group>
              </>
            )
            : <div>{content}</div>}
        </div>
    )
}

export default ReplyContent
