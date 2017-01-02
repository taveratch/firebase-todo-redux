import React from 'react'

export default (props) => {
  return (
    <a style={{margin: "20px"}} href={props.href} onClick={props.onClick || (() => {})} className="modal-trigger pull-right pull-bottom btn-floating btn-large waves-effect waves-light red">
      <i className="material-icons">add</i>
    </a>
  )
}
