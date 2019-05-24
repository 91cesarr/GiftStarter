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
          props.history.push("/")
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
    <Paper className="justify">
      <div className="placeholder_reg_img"></div>
      <div className="reg">
        <div className="loginIcon">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
          </Typography>
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
  )
}

export default Register