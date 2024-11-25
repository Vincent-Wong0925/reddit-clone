import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPost, 
        isLoadingPost,
        selectPost } from "./postSlice";
import Post from "./Post";

function PostList() {
    const dispatch = useDispatch();
    const posts = useSelector(selectPost);
    const loadingPost = useSelector(isLoadingPost);

    useEffect(() => {dispatch(loadPost('top'))},[]);

    if (loadingPost) {
        return <div>Loading post...</div>
    }

    if (!posts) {
        return null;
    }

    return (
        <div className="PostList">
            {posts.map(post => <Post post={post.data}/>)}
        </div>
    );
}

export default PostList;