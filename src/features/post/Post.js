import React from "react";
import './post.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faCircleUp as farCircleUp, 
        faCircleDown as farCircleDown,
        faComment } from "@fortawesome/free-regular-svg-icons";

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

    const defaultThumbnail = ['self', 'default', 'nsfw'];

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
                    <button className="up vote-button">
                        <FontAwesomeIcon className="vote-icon" icon={farCircleUp} />
                    </button>
                    <p>{ups}</p>
                    <button className="down vote-button">
                        <FontAwesomeIcon className="vote-icon" icon={farCircleDown} />
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