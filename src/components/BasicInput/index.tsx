import React, { InputHTMLAttributes } from 'react';
import './styles.css';

interface BasicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
  handleNewValue: (event: any) => void;
}

const BasicInput: React.FC<BasicInputProps> = ({
  label,
  name,
  type,
  handleNewValue,
  ...rest
}) => {
  return (
    <div className={`basic-input-group ${name}`}>
      <label className="basic-input-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="basic-input"
        type={type}
        id={name}
        onChange={handleNewValue}
        {...rest}
      />
    </div>
  );
};

export default BasicInput;
