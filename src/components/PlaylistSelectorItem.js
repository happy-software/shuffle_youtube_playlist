import React from 'react';

function PlaylistSelectorItem(props) {
  return (
    <div className="playlistSelectorItem">
      <label className="checkbox_label">
        <input
          type="checkbox"
          value={props.value}
          checked={props.checked}
          onChange={() => props.onCheckboxChange(props.value)}
          className="checkbox_input"
        />{props.label}</label>
    </div>
  )
}

export default PlaylistSelectorItem;