import React, { useState, useContext } from "react"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { AuthContext } from "../../lib/auth"
import { Link } from 'react-router-dom'
//spring.io transitions
import { Spring } from 'react-spring/renderprops'
const Register = props => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirm] = useState("")
  const [userError, setUserError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [errorText, setErrorText] = useState("")
  const { register } = useContext(AuthContext)

  function sendRegister(e) {
    e.preventDefault()
    if (password === confirmPassword) {
      setPassError(false)
      register(username, password)
        .then(() => {
          props.history.push("/login")
        })
        .catch(err => {
          setUserError(true)
          setErrorText(err)
        })
    } else {
      setPassError(true)
      setErrorText("Passwords must match")
    }
  }

  return (
    <Spring
      from={{ opacity: 0, marginLeft: -500 }}
      to={{ opacity: 1, marginLeft: 0 }}
    >
      {props => (
        <Paper className="justify" style={props}>
      <div className="placeholder_reg_img"></div>
      <div className="reg">
        <div className="loginIcon">
          <div id="login_logo">WishBig</div>
          <Avatar id="lock_color">
            <LockOutlinedIcon />
          </Avatar>
          <Typography id="welc_msg" component="h1" variant="h5">
            Registration
          </Typography>
              <Link className="back-link" to="/login"><h4 style={{ textAlign: 'center' }}>Already have an account?</h4></Link>
        </div>
        <form onSubmit={sendRegister}>
          {userError || passError ? (
            <Typography color="error">{errorText}</Typography>
          ) : (
              ""
            )}
          <FormControl error={userError} margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Username</InputLabel>
            <Input
              onChange={e => setUsername(e.target.value)}
              id="email"
              name="email"
              autoFocus
            />
          </FormControl>
          <FormControl error={passError} margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              onChange={e => setPassword(e.target.value)}
              name="password"
              type="password"
              id="password"
            />
          </FormControl>
          <FormControl error={passError} margin="normal" required fullWidth>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <Input
              onChange={e => setConfirm(e.target.value)}
              name="confirmPassword"
              type="password"
              id="confirmPassword"
            />
          </FormControl>
          <Button
            className="loginButton"
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
          >
            Register
          </Button>
        </form>
      </div>
      </Paper>
      )}
    </Spring>
  )
}

export default Register