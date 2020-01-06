import React from 'react';
import { Link } from 'react-router-dom';
import Style from './LinkButton.module.css';

export function LinkButton({ to, text }) {
  return <Link to={to} className={Style.link}>
    <div className={Style.button}>
      {text}
    </div>
  </Link>;
}