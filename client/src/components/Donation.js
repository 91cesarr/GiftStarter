import React, { useState,useEffect, useContext, Component } from "react"
import { AuthContext } from "../lib/auth"
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import profile from "assets/img/examples/redcharlie-1254208-unsplash.jpg";
import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
// Donation actions
import { connect } from "react-redux"
// Payment Module
import Payment from "../components/Payment"
import { getTotal, getItem } from "../actions/actions";

class Donation extends Component {
componentDidMount() {
  const id = this.props.match.params.item_id
  getItem(id)
  getTotal(id)
    console.log("props",this.props)
}
  componentWillMount() {
    
  }
  // const { item_id } = useContext(AuthContext)
  // const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgCard,
      classes.imgFluid
    );

  return (
    <div>
      <Header
        color="transparent"
        brand="Donation Page"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>A Yacht Maybe 2</h3>
                    <h2>{this.props.user_id}</h2>
                    <h4>Total Amount</h4>
                    {/* <h3>{props.amount}</h3> */}

                    <br />
                    <h4>Remaining Amount</h4>
                    <h3>$9999</h3>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken
                by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                performs and records all of his own music, giving it a warm,
                  intimate feel with a solid groove structure.{" "}
              </p>
            </div>
            {/* Payment module does here */}
            <Payment/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  }
}

function mapStateToProps(appState) {
  return { 
    user: appState.user,
    user_id: appState.user_id,
    item_id: appState.item.item_id,
    requestor_id: appState.item.requestor_id,
    name: appState.user.name,
    description: appState.item.description,
    category: appState.item.category,
    reason: appState.item.reason,
    amount: appState.item.amount,
    picture_url: appState.item.picture_url,
    item_url: appState.item.item_url
    // user: appState.user,
    // thumbnail: appState.user.avatar_url,
    // name: appState.user.name,
    // username: appState.user.login
  };
}
export default withStyles(profilePageStyle)(connect(mapStateToProps)(Donation))