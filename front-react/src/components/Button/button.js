import React from 'react';

export default function Button(props) {

    const {img, type, id } = props;

    return (
        <button type={type} id={id} className="button" onClick={props.onHandle}>
            <img src={img} id={id} alt="Send" width="30" height="25"/>
        </button>
    );
}