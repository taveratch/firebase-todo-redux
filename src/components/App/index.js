import React, { Component } from 'react';
import {loadSections, loadSingleTodos, createSection} from 'actions/todo'
import {connect} from 'react-redux'
import Card from './card'
import Loader from './shared/loader'
import _ from 'lodash'
class App extends Component {
  componentDidMount() {
    //load sections since entered this page
    this.props.loadSections()
  }
  onSubmit = (e) => {
    e.preventDefault()
    // get value from input field and insert to database
    let ref = this.refs['section-name']
    let name = ref.value
    this.props.createSection(name)
    ref.value = '' //clear input field
  }
  render() {
    let reducer = this.props.todo
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="input-field">
            <input placeholder="Add new section" type="text" className="validate" id="section-name" ref="section-name"/>
            <label htmlFor="section-name">Add new section</label>
          </div>
        </form>
        <ul className="collection with-header">
          <li className="collection-header"><h5>Sections</h5></li>
          <Loader />
          {
            _.map(reducer.todo, (section, i) => <Card onClick={this.props.loadSingleTodos.bind(this, section.id)} key={i} count={section.todos.length} name={section.name} />)
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todo: state.todo
})

export default connect(mapStateToProps,{loadSections, loadSingleTodos, createSection})(App);
