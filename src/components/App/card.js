import React from 'react'

export default (props) => {
  return (
    <a className="collection-item" onClick={props.onClick}>{props.name}</a>
  )
}
