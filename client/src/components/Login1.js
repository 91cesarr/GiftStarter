import React, { useState,useContext } from 'react'
import { createUsername } from '../actions/actions'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { AuthContext } from '../lib/auth'

export default props => {
  const [username, setUsername] = useState("")
  const { user } = useContext(AuthContext)

  function sendUser(e) {
    e.preventDefault()
    createUsername(username)
  }


  return (
    <form onSubmit={sendUser}>
      <Input autoFocus type="text" placeholder={user} onChange={e => setUsername(e.target.value)} value={username}/>
      <Button type="submit" variant="contained" color="primary">Send</Button>
    </form>
  )
}