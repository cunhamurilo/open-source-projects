import React from 'react';

import './styles.css';

export default function Checkbox({ label, id,defaultChecked, setChecked,...rest }) {

    return (
        <div className="checkbox-block">
            <input type='checkbox' id={id} name={id} defaultChecked={defaultChecked} onChange={() => setChecked(!defaultChecked)} {...rest}/>
            <label htmlFor={id}> {label}</label>
        </div>
    );
}