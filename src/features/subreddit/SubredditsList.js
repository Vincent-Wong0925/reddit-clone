import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Subreddit.css';
import { loadSubredditsList, 
        selectSubredditsList,
        isLoadingSubreddit } from "./subredditSlice";
import Subreddit from "./Subreddit";

function SubredditsList() {
    const dispatch = useDispatch();
    const subredditsList = useSelector(selectSubredditsList);
    const LoadingSubreddit = useSelector(isLoadingSubreddit);

    useEffect(() => {dispatch(loadSubredditsList())},[]);

    if (LoadingSubreddit) {
        return <div>Loading...</div>;
    }

    if (!subredditsList) {
        return null;
    }

    return (
        <div className="SubredditsList">
            {subredditsList.map(subreddit => 
                <Subreddit 
                    className="Subreddit"
                    name={subreddit.name} 
                    url={subreddit.url} 
                    icon={subreddit.icon} />
                )
            }
        </div>
    );
}

export default SubredditsList;