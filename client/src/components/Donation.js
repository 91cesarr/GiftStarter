import React, { Component } from "react"
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

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
// Donation actions
import { connect } from "react-redux"
// Payment Module
import Payment from "../components/Payment" 
import { getItem, getTotal } from "../actions/actions";

class Donation extends Component {
  
componentDidMount() {
  const id = this.props.match.params.item_id
  getItem(id)
  getTotal(id)
}
  componentWillMount() {
    
  }
  render() {
    const rem = this.props.amount - this.props.total
    const { classes, ...rest } = this.props;
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
              <GridItem xs={12} sm={12} md={12}>
                  <img src={this.props.picture_url} alt="..." className="itemIMG" />
                <div className={classes.profile}>
                  <div className={classes.name}>
                      <h1>{this.props.name}</h1>
                    <h2>Total Amount</h2>
                    <h3>${this.props.amount}</h3>
                    <h2>Remaining Amount</h2>
                    <h3>${rem}</h3>
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
                  <div>
                     <h2>Description</h2>
                    <p>{this.props.description}{" "}
                    </p>
                  </div>
                  <br />
                  <div>
                   <h2>Reason</h2>
                    <p>{this.props.reason}{" "}
                    </p>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
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
    id: appState.item.id,
    user: appState.user,
    user_id: appState.user_id,
    item_id: appState.item.item_id,
    requestor_id: appState.item.requestor_id,
    total: appState.donation_amount.total,
    name: appState.item.name,
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