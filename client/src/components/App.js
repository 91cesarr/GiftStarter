import React from "react"
import { Provider } from "react-redux"
import store from "../store"
import Create from "./Create"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthProvider, AuthRoute } from "../lib/auth"
import Login from "./auth/Login"
import Register from "./auth/Register"
import "../styles/main.css"

const App = props => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <div>
            {/* public routes */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

            {/* private routes */}
            <AuthRoute path="/" exact component={Create} />
          </div>
        </Router>
      </Provider>
    </AuthProvider>
  )
}

export default App