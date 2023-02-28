import React, { useState } from 'react';
import './BlogPost.css';
import Comment from './Comment';

export default function BlogPost(props) {
    const { post, index } = props;
    const { title, body, id } = post;
    const [comments, setComments] = useState(false);

    async function commentsToggle() {
        if (!comments) {
            try {
                let response = await (await fetch('https://jsonplaceholder.typicode.com/comments?postId=' + id)).json();
                setComments(
                    <ul class="list-group">
                        {response.map(comment => <Comment comment={comment} />)}
                    </ul>);
            } catch (e) {
                setComments(<div className='text-danger'>ERROR: Comments failed to load</div>)
            }
        } else {
            setComments(false);
        }
    }

    return (
        <div className="m-md-2 m-lg-5 pb-5">
            <h3 className='post-title bg-primary col-12 col-lg-10 rounded-pill px-5 py-2 text-white d-inline-block border border-info border-4 bg-gradient'>Post #{index + 1} {title}</h3>
            <p className='post-body col-md-10 col-lg-8 col-xl-7 m-auto rounded border border-primary border-3 p-3 bg-light'>{body}</p>
            <div className='comment-toggle col-12 col-md-10 col-lg-8 col-xl-7 d-inline-block text-end'>
                <button className='text-end mt-2 bg-info btn btn-outline-primary'
                    onClick={() => commentsToggle()}>{comments ? "Hide Comments" : "Show Comments"}</button>
                {comments}
            </div>
        </div>
    )
}
