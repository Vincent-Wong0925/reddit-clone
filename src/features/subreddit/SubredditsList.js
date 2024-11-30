import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Subreddit.css';
import { loadSubredditsList, 
        selectSubredditsList,
        isLoadingSubreddit } from "./subredditSlice";
import Subreddit from "./Subreddit";

function SubredditsList({showSubreddits}) {
    const dispatch = useDispatch();
    const subredditsList = useSelector(selectSubredditsList);
    const LoadingSubreddit = useSelector(isLoadingSubreddit);

    useEffect(() => {dispatch(loadSubredditsList())},[dispatch]);

    if (LoadingSubreddit) {
        return <div>Loading...</div>;
    }

    if (!subredditsList) {
        return null;
    }

    return (
        <div className="SubredditsList" style={!showSubreddits ? {visibility: 'hidden'} : null}>
            {subredditsList.map(subreddit => { 
                const {display_name_prefixed, url, icon_img, id} = subreddit.data;
                return <Subreddit 
                    className="Subreddit"
                    name={display_name_prefixed} 
                    url={url} 
                    icon={icon_img}
                    key={id} />
                })
            }
        </div>
    );
}

export default SubredditsList;