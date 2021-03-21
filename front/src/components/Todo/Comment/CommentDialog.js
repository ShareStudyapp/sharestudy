import React, { useCallback } from 'react';

const CommentDialog = ({ onClose }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <div className="commentDialog" onClick={onClose}>
      <div className="commentDialog__wrap" onClick={stopPropagation}>
        <section className="commentDialog__wrap_middle">
          <article className="content">
            <input />
            <textarea />
          </article>
        </section>
        <section className="commentDialog__wrap_bottom">
          <button className="left">취소하기</button>
          <button className="right">저장하기</button>
        </section>
      </div>
    </div>
  );
};

export default CommentDialog;
