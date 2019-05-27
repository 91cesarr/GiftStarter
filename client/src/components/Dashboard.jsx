import React, { useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { AuthContext } from '../lib/auth'
import { getUser } from '../actions/actions'

// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
// import { makeStyles } from '@material-ui/styles';

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import DashData from "./DashData.jsx";

//spring.io transitions
import { Spring } from 'react-spring/renderprops'

const dashboardRoutes = [];

const Dashboard = props => {
  const { classes, ...rest } = props;
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getUser(user)
  }, [user])

  return (
    <Spring
      from={{ opacity: 0, marginLeft: -500 }}
      to={{ opacity: 1, marginLeft: 0 }}
    >
      {props => (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Wish Big"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 80,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/landing-bg.jpg")}
      style={props}
      >
        <div
          className={classes.container}
        >
          <h1
            className={classes.title}
          >Hello, {user}! Welcome to your dashboard.</h1>
        </div>
      </Parallax>
      <div
        className={classNames(classes.main, classes.mainRaised)}
      >
        <div
          className={classes.container}
        >
          <DashData />
        </div>
      </div>
    </div>
      )}
    </Spring>
  );

}

function mapStateToProps(appState) {
  return {
    userData: appState.user,
  }
}

export default withStyles(landingPageStyle)(connect(mapStateToProps)(Dashboard))