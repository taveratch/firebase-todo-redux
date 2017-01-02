import React, {Component} from 'react'
import {connect} from 'react-redux'

class Loader extends Component {
  render() {
    let style = {display: this.props.isLoading ? 'inherit' : 'none'}
    return (
      <div className="margin-all" style={style}>
        <div className="preloader-wrapper small active container" style={{display: 'inherit'}}>
          <div className="spinner-layer spinner-green-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {isLoading: state.todo.isLoading}
}

export default connect(mapStateToProps)(Loader)
