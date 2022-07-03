import React from 'react';

export default function Item({ task, remove, update }) {
  return (
    <div className="item">
      <div className="text">{task}</div>
      <div className="icons">
        <i className="ri-pencil-fill" onClick={update}></i>
        <i className="ri-delete-bin-7-fill" onClick={remove}></i>
      </div>
    </div>
  );
}
