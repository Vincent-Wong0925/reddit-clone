import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPost, isLoadingPost } from "./postSlice";

function PostList() {
    const dispatch = useDispatch();
    const loadingPost = useSelector(isLoadingPost);

    useEffect(() => {dispatch(loadPost('top'))},[]);

    return (
        <>
        
        </>
    );
}

export default PostList;