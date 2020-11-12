import React, { FC } from 'react';

interface ButtonProps {
    type?: 'primary' | 'secondary';
    onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, type = 'primary', onClick = () => {} }) => {
    return (
        <button
            className={`btn btn-${type}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;
