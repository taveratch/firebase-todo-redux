import React from 'react'
import _ from 'lodash'

export default (props) => {
  return (
    <a className="collection-item" onClick={props.onClick}>
      <span className="badge">{props.count}</span>
      <div className="flex flex-middle">
        <div className="circle text-center teal margin-right">
          {_.toUpper(props.section.name.substring(0,1))}
        </div>
        <div>
          <span>{props.section.name}</span>
          <br></br>
          <span className="description-text">{`${props.section.dateStr} ${props.section.timeStr}`}</span>
        </div>
      </div>
    </a>
  )
}
