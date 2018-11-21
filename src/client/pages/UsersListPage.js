import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions'

class UsersListPage extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  renderUsers() {
    return this.props.users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))
  }

  render() {
    return (
      <div>
        Here's a list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
})

// working with Redux manually by calling dispatch
const loadData = store => store.dispatch(fetchUsers())

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersListPage),
}
