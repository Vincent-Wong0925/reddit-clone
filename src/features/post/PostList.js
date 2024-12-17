import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPost, 
        isLoadingPost,
        selectPost } from "./postSlice";
import Post from "./Post";
import './post.css';

function PostList() {
    const dispatch = useDispatch();
    const posts = useSelector(selectPost);
    const loadingPost = useSelector(isLoadingPost);

    useEffect(() => {dispatch(loadPost('top'))},[dispatch]);

    if (loadingPost) {
        return <div>Loading post...</div>
    }

    if (posts.length === 0) {
        return null;
    }

    return (
        <div className="PostList" data-testid='PostList'>
            {posts.map(post => <Post post={post.data} id={post.data.id} key={post.data.id} />)}
        </div>
    );
}

export default PostList;