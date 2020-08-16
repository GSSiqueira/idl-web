import React, { ButtonHTMLAttributes } from 'react';
import './styles.css';

interface BasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  name: string;
}

const BasicButton: React.FC<BasicButtonProps> = ({ label, name, ...rest }) => {
  return (
    <button className={`basic-button ${name}`} id={name} {...rest}>
      {label}
    </button>
  );
};

export default BasicButton;
