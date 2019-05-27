import React, { useEffect, useContext } from "react"
import { AuthContext } from '../lib/auth'
import { connect } from "react-redux"
import { getUser, getItemData, getDonList } from "../actions/actions";

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import DonItemData from "./DonItemData.jsx";

//spring.io transitions
import { Spring } from 'react-spring/renderprops'

const Donation = (props) => {

  useEffect(() => {
    getItemData(props.match.params.item_id)
  }, [props.match.params.item_id])

  const { classes, ...rest } = props;

  return (
    <div>
      <Header
        color="transparent"
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
        <div className={classes.container}>
          <GridContainer>
            <Spring
              from={{ opacity: 0, marginLeft: -500 }}
              to={{ opacity: 1, marginLeft: 0 }}
            >
              {animStyle => (
                <GridItem xs={12} sm={12} md={6} style={animStyle}>
                  <div>
                    <h1 className={classes.title}>{props.item.requestor} is asking for {props.item.name}</h1>
                    <h4>
                {props.item.description}
              </h4>
              </div>
                </GridItem>
              )}
              </Spring>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <DonItemData />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(appState) {
  return {
    item: appState.item
  }
}
export default withStyles(landingPageStyle)(connect(mapStateToProps)(Donation))