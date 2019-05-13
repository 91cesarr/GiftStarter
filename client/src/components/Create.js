import React, { useContext } from 'react'
import { connect } from 'react-redux'
import { AuthContext } from '../lib/auth'
import './style.css';

const fs = require('fs');
const imgurUploader = require('imgur-uploader');

imgurUploader(fs.readFileSync('cat.jpg'), { title: 'Hello!' }).then(data => {
  console.log(data);
  /*
  {
      id: 'OB74hEa',
      link: 'http://i.imgur.com/jbhDywa.jpg',
      title: 'Hello!',
      date: Sun May 24 2015 00:02:41 GMT+0200 (CEST),
      type: 'image/jpg',
      ...
  }
  */
});

const Chat = props => {
  const { signout, user } = useContext(AuthContext)


  function logout() {
    signout()
    props.history.push("/")
  }

  return (
    <div className="container">
      <div className="itemUser">
        <p>{user}</p>
        <button onClick={logout}>Logout</button>
      </div>
      <h1>Create Your Request</h1>


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