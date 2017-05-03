import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'
import UserSearch from '../components/UserSearch'

class App extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.actions.queryTodo();
  }

  handleUserSearch = evt => {
    this.props.actions.searchUsers(evt.target.value);
  }

  render() {
    const {todos, actions, users} = this.props
    return (
      <div>
        <Header addTodo={actions.addTodo} />
        <MainSection todos={todos} actions={actions} />
        <div style={{marginTop: 30, display: 'flex', flexDirection: 'column'}}>
          <input type="text" onChange={this.handleUserSearch}/>
          <UserSearch results={users}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  todos: state.todos,
  users: state.users,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
