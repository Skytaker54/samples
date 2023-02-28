import React from 'react'

export default function Comment(props) {
    const { body,name,email } = props.comment;
    return (
        <li className='list-group-item text-start'>
            <p>{body}</p>
            <div className='fw-bold'>{name} <span className='text-secondary fw-light'>{email}</span></div>
        </li>
    )
}
