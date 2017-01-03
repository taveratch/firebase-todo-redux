import React from 'react'
import _ from 'lodash'

export default (props) => {
  return (
    <a className="collection-item pointer" onClick={props.onClick}>
      <span className="badge">{`${props.checkedCount}/${props.totalCount}`}</span>
      <div className="flex flex-middle">
        <div className="circle text-center teal margin-right">
          {getIconText(props.section.name)}
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

const getIconText = (text) => {
  return _.toUpper(text.substring(0,1))
}
