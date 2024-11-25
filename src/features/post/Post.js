import React from "react";

function Post({post}) {
    const {title, selftext} = post;

    return (
        <div className="post">
            <h2>{title}</h2>
            <p>{selftext}</p>
        </div>
    );
}

export default Post;