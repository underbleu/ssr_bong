import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = ({ auth }) => {

  const authButton = auth
    ? ( <a href="/api/logout">Logout</a> )
    : ( <a href="/api/auth/google">Login</a> )

  return (
    <header
      style={{
        display: 'inline-block',
        backgroundColor: '#eee',
        width: '100%',
      }}
    >
      <h1 style={{ float: 'left' }}><Link to="/">SSR_BONG</Link></h1>
      <ul
        style={{
          float: 'right',
        }}
      >
        <Link to="/users">Users</Link>
        <Link to="/admins">Admins</Link>
        {authButton}
      </ul>
    </header>
  )
}

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps)(Header)
