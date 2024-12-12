import React from "react";
import Comment from "./Comment";
import './comment.css';

function CommentList({
    id,
    comments,
    nested
}) {

    return (
        <div className={nested ? "nested CommentList" : "CommentList"} data-testid='CommentList'>
            {comments.map(comment => <Comment id={id} comment={comment} />)}
        </div>
    );
}

export default CommentList;