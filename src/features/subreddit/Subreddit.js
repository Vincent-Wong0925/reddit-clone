import React from "react";
import "./Subreddit.css";

function Subreddit({name, url, icon}) {
    return (
        <button className="subreddit-button">
            <img className="subreddit-icon" src={icon} />
            <p className="subreddit-name">{name}</p>
        </button>
    );
}

export default Subreddit;