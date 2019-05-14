import React from "react"
import { Provider } from "react-redux"
import store from "../store"
import Create from "./Create"
import Donation from "./Donation"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthProvider, AuthRoute } from "../lib/auth"
import Login from "./auth/Login"
import Register from "./auth/Register"
import "../styles/main.css"

import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: '#b085f5',
      main: '#4527a0',
      // dark: '#4d2c91',
      contrastText: '#00B4DB',
    },
    secondary: {
      // light: '#cfcfcf',
      main: '#b2dfdb',
      // dark: '#707070',
      contrastText: '#0083B0',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const App = props => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
              {/* public routes */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            {/* public routes */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/donation" component={Donation} />
            {/* private routes */}
            <AuthRoute path="/" exact component={Create} />
          </MuiThemeProvider>
        </Router>
      </Provider>
    </AuthProvider>
  )
}

export default App