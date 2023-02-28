import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import HomeButton from './HomeButton';
import LoadSpinner from './LoadSpinner';
import { useParams } from 'react-router-dom';
import Range from './Range';

export default function Blog() {
    const { id } = useParams();
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(0);
    const [range, setRange] = useState(null);
    const POSTS_PER_PAGE = 3;

    useEffect(() => {
        const abort = new AbortController();
        getData();
        async function getData() {
            let response;
            setError(false);
            setLoading(true);
            try {
                response = await (await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + id, { signal: abort.signal })).json();
            } catch (e) {
                setError(true);
                setLoading(false);
            }
            if (response) {
                setTimeout(() => {
                    setPosts(response.map((post, index) => <BlogPost post={post} key={post.id} index={index} />));
                    setLoading(false);
                }, 2000);
            }
        }
        return () => abort.abort();
    }, [id]);

    useEffect(() => {
        setRange(<Range pages={posts?.length / POSTS_PER_PAGE} click={rangeClick} />);
    }, [posts]);

    function rangeClick(num) {
        setPage(num);
    }
    const postsOnPage = posts?.slice(page * POSTS_PER_PAGE, page * POSTS_PER_PAGE + POSTS_PER_PAGE);
    return (
        <article className="text-center container">
            <HomeButton />
            <ul className="mx-xl-5 p-0 row justify-content-center">
                {loading
                    ? <LoadSpinner />
                    : error ?
                        <div>Error: Posts not found</div>
                        : postsOnPage}
            </ul>
            {range}
            <HomeButton />
        </article>
    )
}
