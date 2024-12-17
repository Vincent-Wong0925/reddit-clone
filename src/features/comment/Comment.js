import React from "react";
import { useState } from "react";
import CommentList from "./CommentList";
import './comment.css';

function Comment({comment}) {
    const {kind} = comment;
    const {author, body, id} = comment.data;
    const [repliesVisible, setRepliesVisible] = useState(false);
    let replies;
    if (comment.data.replies) {
        replies = comment.data.replies.data.children.filter(item => item.kind === 't1');
        if (replies.length === 0) {
            replies = null;
        }
    }

    function showReplies() {
        setRepliesVisible(!repliesVisible);
    }

    if (kind !== 't1') {
        return null;
    }

    return (
        <div className="Comment" data-testid="Comment">
            <h4>u/{author}</h4>
            <p>{body}</p>
            {replies ? <button className="replies-button" onClick={showReplies}>Replies</button> : null}
            {repliesVisible ? <CommentList nested={true} id={id} comments={replies} /> : null}
        </div>
    );
}

export default Comment;