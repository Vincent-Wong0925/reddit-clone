import React from "react";
import Comment from "./Comment";
import './comment.css';

function CommentList({
    id,
    comments
}) {

    return (
        <div className="CommentList">
            {comments.map(comment => <Comment id={id} comment={comment} />)}
        </div>
    );
}

export default CommentList;