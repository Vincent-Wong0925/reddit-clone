import React from "react";
import './post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleUp as farCircleUp, 
        faCircleDown as farCircleDown,
        faComment } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadComments, selectComments, isLoadingComments } from "../comment/commentslice";
import CommentList from "../comment/CommentList";

function Post({post}) {
    const {
        title, 
        selftext, 
        author,
        ups,
        subreddit_name_prefixed,
        thumbnail,
        is_video,
        media,
        permalink,
        id
    } = post;

    const [upVotes, setUpVotes] = useState(ups);
    const [commentsVisible, setCommentVisible] = useState(false);

    const defaultThumbnail = ['self', 'default', 'nsfw'];
    const dispatch = useDispatch();
    const comments = useSelector(selectComments);
    const loadingComments = useSelector(isLoadingComments);

    function upVote(e) {
        if (e.currentTarget.getAttribute('class') === 'up vote-button') {
            setUpVotes(upVotes + 1);
            e.currentTarget.setAttribute('class', 'active up vote-button');
        } else if (e.currentTarget.getAttribute('class') === 'active up vote-button') {
            setUpVotes(upVotes - 1);
            e.currentTarget.setAttribute('class', 'up vote-button');
        }
    }

    function downVote(e) {
        if (e.currentTarget.getAttribute('class') === 'down vote-button') {
            setUpVotes(upVotes - 1);
            e.currentTarget.setAttribute('class', 'active down vote-button');
        } else if (e.currentTarget.getAttribute('class') === 'active down vote-button') {
            setUpVotes(upVotes + 1);
            e.currentTarget.setAttribute('class', 'down vote-button');
        }
    }

    function showComments(e) {
        if (commentsVisible) {
            setCommentVisible(false);
        } else {
            setCommentVisible(true);
            dispatch(loadComments({
                id: id, 
                permalink: permalink.replace(/\/$/, "")
            }));
        }
    }

    return (
        <div className="post">
            <h3>{subreddit_name_prefixed}</h3>
            <p>u/{author}</p>
            <h2>{title}</h2>
            <p>{selftext}</p>
            {
                is_video?
                <video className="reddit-video" controls>
                    <source src={media.reddit_video.fallback_url} />
                    Video cannot be played.
                </video> :
                thumbnail !== "" && !defaultThumbnail.includes(thumbnail)?
                <img className="thumbnail" src={thumbnail} alt="thumbnail" /> :
                null
            }
            <div className="post-footer">
                <div className="votes">
                    <button className="up vote-button" onClick={upVote}>
                        <FontAwesomeIcon className="vote-icon" icon={upVotes > ups ? faCircleUp : farCircleUp} />
                    </button>
                    <p>{upVotes}</p>
                    <button className="down vote-button" onClick={downVote}>
                        <FontAwesomeIcon className="vote-icon" icon={upVotes < ups ? faCircleDown : farCircleDown} />
                    </button>
                </div>
                <button className="comments" onClick={showComments}>
                    <FontAwesomeIcon className="comments-icon" icon={faComment} />
                    <p>Comments</p>
                </button>
            </div>
            {
                !commentsVisible ?
                null :
                loadingComments ? 
                <div>Loading Comments...</div> :
                comments[id] ? 
                <CommentList id={id} comments={comments[id]} /> : 
                null
            }
        </div>
    );
}

export default Post;