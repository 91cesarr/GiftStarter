import React from "react"
import { Provider } from "react-redux"
import store from "../store"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { AuthProvider, AuthRoute } from "../lib/auth"

import Footer from './Footer/Footer.jsx'
import Create from "./Create.jsx"
import Donation from "./Donation.jsx"
import Dashboard from "./Dashboard.jsx"
import Login from "./auth/Login"
import Register from "./auth/Register"
import "../styles/main.css"

import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: '#b085f5',
      main: '#8e24aa',
      // dark: '#4d2c91',
      contrastText: '#fff',
    },
    secondary: {
      // light: '#cfcfcf',
      main: '#00acc1',
      // dark: '#707070',
      contrastText: '#fff',
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
            <Route path="/donation/:item_id" exact component={Donation} />
            {/* private routes */}
            <AuthRoute path="/" exact component={Create} />
            <AuthRoute path="/dashboard" component={Dashboard} />
            <Footer />
          </MuiThemeProvider>
        </Router>
      </Provider>
    </AuthProvider>
  )
}

export default App