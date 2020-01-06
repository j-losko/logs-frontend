import React from 'react';
import Style from './Button.module.css';

export function Button({ onClick, text, style}) {
  return <div onClick={onClick} className={Style.button} style={style}>
    {text}
  </div>;
}