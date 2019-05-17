import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { AuthContext } from '../lib/auth'
import './style.css';

const Chat = props => {
  const { signout, user } = useContext(AuthContext)


  function logout() {
    signout()
    props.history.push("/")
  }

  return (
    <div className="container">
      <h1>Create Gift Starter Page</h1>
      <p>{user}</p>
      <button onClick={logout}>Logout</button>
      <div className="temp-container">
        <div className="content">
          Blank Page Template
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(appState) {
  return {
    username: appState.username,
  }
}

export default connect(mapStateToProps)(Chat)