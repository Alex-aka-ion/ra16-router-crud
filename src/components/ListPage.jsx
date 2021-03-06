import Post from "./Post";
import React from "react";
import useFetch from "../hooks/useFetch";
import {Link} from "react-router-dom";

export default function ListPage() {
    const [posts, loading, error] = useFetch({url: '/posts'}, []);

    return (
        <div>
            <div className="card w-50">
                <div className="card-body text-right">
                    <Link to={`/posts/new`}>
                        <button className="btn btn-primary">Создать пост</button>
                    </Link>
                </div>
            </div>
            {loading && <p>Loading</p>}
            {error && <p>Error {error}</p>}
            {posts.map((post) => <Post key={post.id} post={post}/>)}
        </div>
    );
}
