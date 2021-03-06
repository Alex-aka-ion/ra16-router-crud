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
        <form onSubmit={onSave}>
            <Link to={'/'}>
                <button>X</button>
            </Link>
            <textarea onChange={onChange} value={text}></textarea>
            {error && <p>Error {error}</p>}
            {loading ? <p>Saving...</p> :
                <button type="submit">{post ? 'Сохранить' : 'Опубликовать'}</button>
            }
        </form>
    );
}
