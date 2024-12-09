import React from "react";
import "./Subreddit.css";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { loadPost } from "../post/postSlice";

function Subreddit({name, icon}) {
    const dispatch = useDispatch();

    function changeSubreddit(e) {
        dispatch(loadPost(name));
    }

    return (
        <button className="subreddit-button" onClick={changeSubreddit}>
            {icon !== "" ? 
            <img className="subreddit-icon" src={icon} alt="subreddit icon" /> : 
            <FontAwesomeIcon className="subreddit-icon" icon={faRedditAlien} />}
            <p className="subreddit-name">{name}</p>
        </button>
    );
}

export default Subreddit;