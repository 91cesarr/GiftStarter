import React from 'react'
// import { connect } from 'react-redux'
// import { AuthContext } from '../lib/auth'
// import { sendItemData } from '../actions/actions'
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
// import { makeStyles } from '@material-ui/styles';

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// // Sections for this page
import CreateForm from "./CreateForm.jsx";

const dashboardRoutes = [];

const CreateItem = props => {
  const { classes, ...rest } = props;

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Request Item"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div
          className={classes.container}
        >
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1
                className={classes.title}
              >What if you could have it all?</h1>
              <h4>
                It's your big day. You want something truly awesome, but your friends and family can't seem to coordinate.
                <br></br><br></br>
                {/* Don't just settle for a bunch of small, cute gifts (which would still be great, but...).
                <br></br><br></br> */}
                Let everyone know what your heart really desires. Create your gift request, send the link to your contacts, and get the financial help you need for the present you REALLY want. Don't forget to WISH BIG!
                </h4>
              <br />
              {/* <Button
                color="danger"
                size="lg"
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Watch video
                </Button> */}
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div
        className={classNames(classes.main, classes.mainRaised)}
      >
        <div
          className={classes.container}
        >
          <CreateForm />
        </div>
      </div>
      <Footer />
    </div>
  );

}

export default withStyles(landingPageStyle)(CreateItem)

