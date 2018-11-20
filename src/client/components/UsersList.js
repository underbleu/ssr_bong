import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../actions'

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  renderUsers() {
    console.log(this.props.users)
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

export default connect(mapStateToProps, { fetchUsers })(UsersList)