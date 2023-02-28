import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import LoadSpinner from './LoadSpinner';
import './Welcome.css';

export default function Welcome(props) {
    const [blogs, setBlogs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
   
    async function getData(abort) {
        let response;
        setError(false);
        setLoading(true);
        try {
            response = await (await fetch('https://jsonplaceholder.typicode.com/users',{signal: abort.signal})).json();
        } catch (e) {
            setError(true);
            setLoading(false);
        }
        if (response) {
            setTimeout(() => {
                setBlogs(response.map(user => <BlogCard user={user} key={user.id} />));
                setLoading(false);
            }, 2000);
        }
    }

    

    useEffect(() => {
        const abort = new AbortController();
        getData(abort);
        return () => abort.abort();
    },[]);

    return (
        <section className="text-center overflow-hidden container">
            <h3 className="rounded-pill d-inline-block bg-primary text-white fw-bold px-5 py-2 m-4 text-decoration-underline">Read one of our amazing blogs</h3>
            <ul className="mx-5 p-0 row justify-content-center">
                {loading
                    ? <LoadSpinner/>
                    : error ?
                        <div>Error: Blogs not found</div>
                        : blogs}
            </ul>
        </section>
    )
}
