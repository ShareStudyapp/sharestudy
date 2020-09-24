import React,{ useState, useCallback, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const PostCardContent = ({ postData, editMode, onChangePost, onCancelUpdate }) => {
  
   const { updatePostLoading, updatePostDone } = useSelector((state) => state.postReducer);
    const [editText, setEditText] = useState(postData);
    useEffect(() => {
      if (updatePostDone) {
        onCancelUpdate();
      }
    }, [updatePostDone]);

    const onChangeText = useCallback((e) => {
      setEditText(e.target.value);
    });
    return ( // 첫 번째 게시글 #해시태그 #해시태그
      <div>
        {editMode
          ? (
            <>
              <TextArea value={editText} onChange={onChangeText} />
              <Button.Group>
                <Button loading={updatePostLoading} onClick={onChangePost(editText)}>수정</Button>
                <Button type="danger" onClick={onCancelUpdate}>취소</Button>
              </Button.Group>
            </>
          )
          : <div>
              {postData}
            </div>
          }
      </div>
    );
};
  

export default PostCardContent;
