import React, { useState } from 'react';
import mic from '../../assets/mic_icon.png'
import rec from '../../assets/rec_icon.png'

export default function ToggleButton(props) {

    const [onOff, setonOff] = useState([false]);
    const [onOffImage, setonOffImage] = useState([mic]);
    const { type, id } = props;

    const handleChange = e => {
        setonOff(!onOff);

        if (onOff){
            setonOffImage(rec);
        } else {
            setonOffImage(mic);
        }
        props.onClick(e);
        e.preventDefault();
    }

    return (
        <button type={type} id={id} className="button" onClick={handleChange}>
            <img src={onOffImage} id={id} alt="Mic" width="30" height="25"/>
        </button>
    );
}