import React from 'react';
import './LoadSpinner.css';

export default function LoadSpinner() {
    return (
        <div className="py-5 my-5">
            <div className="spinner-border text-primary fw-bold" role="status">
                <span className="">&nbsp;&nbsp;Loading...</span>
            </div>
        </div>
    )
}
