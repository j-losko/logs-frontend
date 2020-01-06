import React, { useState } from 'react';

export default function useInput({ label, type }) {
  const [value, setValue] = useState("");
  const input = <div style={{margin: '10px 0'}}>
    <div>{label}</div>
    <input value={value} onChange={e => setValue(e.target.value)} type={type} />
  </div>;
  return [value, input];
}