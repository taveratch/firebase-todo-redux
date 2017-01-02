import React from 'react'

export default (props) => {
  return (
    <a className="collection-item" onClick={props.onClick}>
      <span className="badge">{props.count}</span>
      {props.name}
    </a>
  )
}
