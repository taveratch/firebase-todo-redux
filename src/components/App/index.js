import React, { Component } from 'react';
import {loadSections, loadSingleTodos, createSection} from 'actions/todo'
import {connect} from 'react-redux'
import Card from './card'
import Loader from './shared/loader'
import _ from 'lodash'
import {getUncheckedCount} from 'reducers/todo'

class App extends Component {
  componentDidMount() {
    //load sections since entered this page
    this.props.loadSections()
    window.$('.modal').modal()
  }
  onSubmit = (e) => {
    e.preventDefault()
    // get value from input field and insert to database
    let ref = this.refs['section-name']
    let name = ref.value
    if(name === '') return
    this.props.createSection(name)
    ref.value = '' //clear input field
    window.$('.modal').modal('close')
  }
  render() {
    let reducer = this.props.todo
    return (
      <div className="container relative">
        <ul className="collection with-header">
          <li className="collection-header"><h5>Sections</h5></li>
          <Loader />
          {
            _.map(reducer.todo, (section, i) => <Card onClick={this.props.loadSingleTodos.bind(this, section.id)}
                                                      key={i}
                                                      totalCount={section.todos.length}
                                                      checkedCount={getUncheckedCount(section.todos)}
                                                      section={section} />)
          }
        </ul>
        <div id="add-section-item-modal" className="modal bottom-sheet">
          <div className="modal-content">
            <h5 style={{marginBottom: 30}}>Add new section</h5>
            <form onSubmit={this.onSubmit}>
              <div className="input-field">
                <input placeholder="Add new section" type="text" className="validate" id="section-name" ref="section-name"/>
                <label htmlFor="section-name">Add new section</label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={this.onSubmit} className=" modal-action modal-close waves-effect waves-green btn-flat">Add</button>
          </div>
        </div>

        <a style={{margin: "20px"}} href={"#add-section-item-modal"} onClick={this.onClick} className="modal-trigger pull-right pull-bottom btn-floating btn-large waves-effect waves-light teal">
          <i className="material-icons">add</i>
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todo: state.todo
})

export default connect(mapStateToProps,{loadSections, loadSingleTodos, createSection})(App);
