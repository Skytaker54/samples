import React from 'react';
import {Link} from 'react-router-dom';

export default function BlogCard(props) {
    const {name,website,company,id} = props.user;
    const {name:companyName,catchPhrase, bs} = company;
  return (
    <div className='col-md-6 col-lg-4 my-2 d-flex justify-content-center'>
        <Link className='blog-button p-3 border-warning border-5 btn btn-info text-start rounded-corners'
                to={`/blog/${id}`}>
            <div className='h3'>{name}</div>
            <div className='fs-4'>{website}</div>
            <div>Company: {companyName}
                <ul class=''>
                    <li>{catchPhrase}</li> 
                    <li>{bs}</li>
                </ul>
            </div>
        </Link>
    </div>
  )
}
