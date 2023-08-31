import React from 'react';

function ToggleableButton(props) {
  return (
    <button
      className={`${props.className}${props.toggled?' toggled':''}`}
      onClick={() => props.setToggled(!props.toggled)}
    >{props.message} {props.svg ? <img className="sytButtonImage" alt={props.message} src={props.svg}/> : <div></div>}</button>
  )
}

export default ToggleableButton;