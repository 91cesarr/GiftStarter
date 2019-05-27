import React from 'react'
import classNames from "classnames"

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// // Sections for this page
import CreateForm from "./CreateForm.jsx";

//spring.io transitions
import { Spring } from 'react-spring/renderprops'

const dashboardRoutes = [];

const CreateItem = props => {
  const { classes, ...rest } = props;

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
      <Parallax small filter image={require("assets/img/landing-bg.jpg")}>
        <div
          className={classes.container}
        >
          <GridContainer>
                <GridItem xs={12} sm={12} md={6} style={props}>
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
    </div>
      )}
    </Spring>
  );

}

export default withStyles(landingPageStyle)(CreateItem)

