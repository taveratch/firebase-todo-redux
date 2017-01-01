import React, { Component } from 'react';
import {loadSections, loadSingleTodos, createSection} from 'actions/todo'
import {connect} from 'react-redux'
import Card from './card'
import _ from 'lodash'
class App extends Component {
  componentDidMount() {
    this.props.loadSections()
  }
  onSubmit = (e) => {
    e.preventDefault()
    let name = this.refs['section-name'].value
    this.props.createSection(name)
  }
  render() {
    let reducer = this.props.todo
    return (
      <div>
        {
          _.map(reducer.todo, (section, i) => <Card onClick={this.props.loadSingleTodos.bind(this, section.id)} key={i} name={section.name} />)
        }
        <form onSubmit={this.onSubmit}>
          <input ref="section-name"/>
          <button>create</button>
        </form>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todo: state.todo
})

export default connect(mapStateToProps,{loadSections, loadSingleTodos, createSection})(App);
