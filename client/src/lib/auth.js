import { decode } from "jsonwebtoken"
import React, { useState, useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import axios from "axios"

function isLoggedIn() {
  const token = localStorage.getItem("authtoken")
  return !!token && !isTokenExpired(token)
}

function isTokenExpired(token) {
  try {
    const decoded = decode(token)
    return decoded.exp < Date.now() / 1000
  } catch (err) {
    return false
  }
}

function getUser() {
  try {
    const token = localStorage.getItem("authtoken")
    const decoded = decode(token)
    return decoded.username
  } catch (err) {
    return null
  }
}

const initialContext = {
  isAuthenticated: false,
  redirectUrl: "/login",
  user: null,
  user_id: ""
}

export const AuthContext = React.createContext(initialContext)


export const AuthProvider = props => {
  const [isAuthenticated, setAuthenticated] = useState(isLoggedIn())
  const [user, setUser] = useState(getUser())
  const [user_id, setUser_id] = useState(getUser())

  function signin(username, password) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/login", { username, password })
        .then(resp => {
          const token = resp.data.token
          axios.defaults.headers.common.Authorization = "Bearer " + token
          window.localStorage.setItem("authtoken", token)
          setUser(getUser())
          setUser_id(getUser())
          setAuthenticated(true)
          resolve()
        })
        .catch(err => {
          console.log(err)
          const error = err.response.data.error
          console.log(error)
          reject(error)
        })
    })
  }

  function register(username, password) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/register", { username, password })
        .then(resp => {
          const token = resp.data.token
          axios.defaults.headers.common.Authorization = "Bearer " + token
          setUser(getUser())
          setAuthenticated(true)
          resolve()
        })
        .catch(err => {
          const error = err.response.data.error
          reject(error)
        })
    })
  }



  function signout() {
    return new Promise((resolve, reject) => {
      axios.defaults.headers.common.Authorization = null
      window.localStorage.removeItem("authtoken")
      setAuthenticated(false)
      resolve()
    })
  }

  const value = {
    isAuthenticated: isAuthenticated,
    user: user,
    user_id: user_id,
    redirectUrl: props.redirectUrl || "/login",
    signin: signin,
    register: register,
    signout: signout
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  )
}

export const AuthRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: auth.redirectUrl, state: { from: props.location } }}
            />
          )
      }
    />
  )
}