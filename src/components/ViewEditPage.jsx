import Post from "./Post";
import CreateEditPage from "./CreateEditPage";
import React, {useState} from "react";
import {Link, Redirect, useParams} from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function ViewEditPage() {

    const {id} = useParams();

    const [data, loading, error, doFetch, redirect] = useFetch({url: '/posts'}, []);

    const post = data.length ? data.filter((item) => item.id === Number(id))[0] : null;

    const [actionEdit, setActionEdit] = useState(false);

    const onDeletePost = (e) => {
        e.preventDefault();
        //DELETE на адрес http://localhost:7777/posts/{id}
        doFetch({
            method: 'DELETE',
            url: `/posts/${id}`,
            redirect: true,
        });

    }
    if (loading)
        return <p>Loading</p>;

    if (error)
        return <p>Error</p>;

    if (redirect)
        return <Redirect to={'/'}/>

    return (
        <>
            {!actionEdit ?
                <>
                    <Post post={post}/>
                    <div className="card w-50">
                        <div className="card-body text-right">
                            <button className="btn btn-outline-info" onClick={() => setActionEdit(true)}>Изменить
                            </button>
                            <button className="btn btn-outline-danger" onClick={onDeletePost}>Удалить</button>
                        </div>
                    </div>
                </>
                :
                <CreateEditPage post={post}/>
            }
        </>
    );
}
