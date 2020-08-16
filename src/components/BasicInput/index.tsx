import React, { InputHTMLAttributes } from 'react';
import './styles.css';

interface BasicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
}

const BasicInput: React.FC<BasicInputProps> = ({
  label,
  name,
  type,
  ...rest
}) => {
  return (
    <div className={`basic-input-group ${name}`}>
      <label className="basic-input-label" htmlFor={name}>
        {label}
      </label>
      <input className="basic-input" type={type} id={name} {...rest} />
    </div>
  );
};

export default BasicInput;
