import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import useFetch from "../hooks/useFetch";

export default function CreateEditPage({post}) {

    const [text, setText] = useState(post ? post.content : null);

    const [data, loading, error, doFetch, redirect] = useFetch(null, null);

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onSave = (e) => {
        e.preventDefault();
        doFetch({
            url: '/posts',
            redirect: true,
            method: 'POST',
            body: {id: post ? post.id : 0, content: text}
        });
    }

    if (redirect)
        return <Redirect to={'/'}/>

    return (
        <form onSubmit={onSave} className="card w-50 text-right">
            <div className="card-body form-group">
                <Link to={'/'}>
                    <button className="btn btn-outline-info">X</button>
                </Link>
                {error && <p>Error {error}</p>}
                <div className="form-group">
                    <textarea className="form-control" onChange={onChange} value={text}/>
                </div>
                {loading ? <p>Saving...</p> :
                    <button type="submit" className="btn btn-primary">{post ? 'Сохранить' : 'Опубликовать'}</button>
                }
            </div>
        </form>
    );
}
