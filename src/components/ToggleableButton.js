import React from 'react'

export default function ToggleableButton(props) {
  return <button className={`${props.className}${props.toggled ? ' toggled' : ''}`} onClick={() => props.setToggled(!props.toggled)}>{props.message}</button>
}