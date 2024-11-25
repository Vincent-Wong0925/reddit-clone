import React from "react";
import "./Subreddit.css";
import { faRedditAlien } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Subreddit({name, url, icon}) {
    return (
        <button className="subreddit-button">
            {icon !== "" ? 
            <img className="subreddit-icon" src={icon} alt="subreddit icon" /> : 
            <FontAwesomeIcon className="subreddit-icon" icon={faRedditAlien} />}
            <p className="subreddit-name">{name}</p>
        </button>
    );
}

export default Subreddit;