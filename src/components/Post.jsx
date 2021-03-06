import React from "react";
import {Link} from "react-router-dom";

export default function Post({post}) {
    if (!(post)) return null;

    const {id, created, content} = post;

    return (
        <div>
            <div>{id}</div>
            <div>{created}</div>
            <div><Link to={`/posts/${id}`}>{content}</Link></div>
        </div>
    );
}
