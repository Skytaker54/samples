import React from 'react';
import {Link} from 'react-router-dom';

export default function HomeButton() {
  return (
    <Link className="home-button rounded-pill d-inline-block btn bg-info btn-outline-primary fw-bold px-5 py-2 m-4 text-decoration-underline" to="/">Home</Link>
  )
}
