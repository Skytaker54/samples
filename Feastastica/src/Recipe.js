import React from 'react'

export default function Recipe(props) {
    const { r } = props;
    return (
        <>
            <div className="col-6 h-100 d-flex justify-content-center align-items-center border-end border-bottom border-dark p-4">
                {r?.image && <img className="img-fluid h-100 w-100" src={r?.image} alt="" />}
            </div>
            <div className="col-6 p-4 border-bottom border-dark">
                <h1 className="pb-3">{r?.name}</h1>
                <h3 className="pb-2">{r?.bannerText}</h3>
                <p className="pb-1">{r?.text}</p>
                <ul className="list-style-disc">{r?.ingredients?.map(i => <li key={i}>{i}</li>)}</ul>
            </div>
        </>
    )
}
