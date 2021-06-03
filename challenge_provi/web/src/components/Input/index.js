import React, { InputHTMLAttributes } from 'react';

import './styles.css';

export default function Input({onChange, label, id, type, ...rest }) {
    return (
        <div className="input-block">
            <input type={type} id={id} onChange={onChange} placeholder={label} {...rest} />
        </div>
    );
}
