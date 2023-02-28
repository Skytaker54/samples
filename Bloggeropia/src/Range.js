import React, { useState, useEffect } from 'react'

export default function Range(props) {
    const { pages, click } = props;
    const [buttons, setButtons] = useState([]);
    useEffect(() => {
        let arr = [];
        for (let i = 0; i < pages; i++) {
            arr.push(<li className="mx-2 d-inline btn btn-outline-primary fs-4 fw-bold"
                key={i} onClick={() => click(i)}>{i + 1}</li>);
        }
        setButtons(arr);
    }, [pages, click]);

    return (
        <div>
            <div className="bg-white d-inline-block rounded-pill px-5 py-2 text-primary fs-4 mb-5">Page:
                <ul className="p-0 m-0 d-inline">
                    {buttons}
                </ul>
            </div>
        </div>
    )
}
