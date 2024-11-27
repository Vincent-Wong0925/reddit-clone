import React from "react";
import './comment.css';

function Comment({comment}) {
    const {kind} = comment;
    const {author, body} = comment.data;

    if (kind !== 't1') {
        return null;
    }

    return (
        <div className="Comment">
            <h4>u/{author}</h4>
            <p>{body}</p>
        </div>
    );
}

export default Comment;