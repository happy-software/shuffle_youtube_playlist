import React from 'react';

function Checkbox(props) {
  return (
    <div className="checkbox">
      <label>
        <input 
          type="checkbox"
          value={props.value}
          checked={props.checked}
          onChange={() => props.onCheckboxChange(props.value)}
        />
        {props.label}
      </label>
    </div>
  )
}

export default Checkbox;