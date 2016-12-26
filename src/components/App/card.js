import React from 'react'

export default (props) => {
  return (
    <div onClick={props.onClick}>{props.name}</div>
  )
}
