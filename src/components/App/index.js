import React, { Component } from 'react';
import {loadSections, loadTodos} from 'actions/todo'
import {connect} from 'react-redux'
import Card from './card'
import _ from 'lodash'
class App extends Component {
  componentDidMount() {
    this.props.loadSections()
  }
  render() {
    let reducer = this.props.todo
    return (
      <div>
        {
          _.map(reducer.todo, (section, i) => <Card onClick={this.props.loadTodos.bind(this, section.id)} key={i} name={section.name} />)
        }
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todo: state.todo
})

export default connect(mapStateToProps,{loadSections, loadTodos})(App);
