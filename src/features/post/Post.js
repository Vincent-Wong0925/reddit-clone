import React from "react";
import './post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleUp as farCircleUp, 
        faCircleDown as farCircleDown,
        faComment } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

function Post({post}) {
    const {
        title, 
        selftext, 
        author,
        ups,
        subreddit_name_prefixed,
        thumbnail,
        is_video,
        media
    } = post;

    const [upVotes, setUpVotes] = useState(ups);

    const defaultThumbnail = ['self', 'default', 'nsfw'];

    function upVote(e) {
        if (e.currentTarget.getAttribute('class') == 'up vote-button') {
            setUpVotes(upVotes + 1);
            e.currentTarget.setAttribute('class', 'active up vote-button');
        } else if (e.currentTarget.getAttribute('class') == 'active up vote-button') {
            setUpVotes(upVotes - 1);
            e.currentTarget.setAttribute('class', 'up vote-button');
        }
    }

    function downVote(e) {
        if (e.currentTarget.getAttribute('class') == 'down vote-button') {
            setUpVotes(upVotes - 1);
            e.currentTarget.setAttribute('class', 'active down vote-button');
        } else if (e.currentTarget.getAttribute('class') == 'active down vote-button') {
            setUpVotes(upVotes + 1);
            e.currentTarget.setAttribute('class', 'down vote-button');
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
                <img className="thumbnail" src={thumbnail} /> :
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
                <button className="comments">
                    <FontAwesomeIcon className="comments-icon" icon={faComment} />
                    <p>Comments</p>
                </button>
            </div>
        </div>
    );
}

export default Post;