import React from 'react';

function Checkbox(props) {
  function toggleCheckboxChange() {
    props.handleCheckboxChange(props.value);
  }

  return (
    <div className="checkbox">
      <label>
        <input 
          type="checkbox"
          value={props.value}
          checked={props.checked}
          onChange={() => toggleCheckboxChange()}
        />
        {props.label}
      </label>
    </div>
  )
}

export default Checkbox;