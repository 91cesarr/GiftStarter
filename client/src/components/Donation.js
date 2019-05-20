import React, { Component } from "react"
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import NavPills from "components/NavPills/NavPills.jsx";

// share page buttons
import { Facebook, Twitter } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'


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
    const url = 'http://localhost:3000' + this.props.match.url
    const shareText = 'Check this out! ' + this.props.name
    console.log(this.props)
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
              <GridContainer>
                <GridItem>
                  <img src={this.props.picture_url} alt="..." className="itemIMG" />
                  <div className={classes.profile}>
                    <div className={classes.name}>
                      <h1>{this.props.name}</h1>
                      <h3>Total Amount</h3>
                      <div>
                        <h5>${this.props.amount}</h5>
                      <i className={"fas fa-info-circle"} /></div>

                      <h3>Remaining Amount</h3>
                      <div>
                        <h5>${rem}</h5>
                      <i className={"fas fa-info-circle"} /></div>
                      <Facebook url={url} />
                      <Twitter url={url} shareText={shareText} />
                    </div>
                    {/* <div>
                      <h2>Description</h2>
                      <p>{this.prop justify="center"s.description}{" "}
                      </p>
                    </div> */}
                      
                    <br />
                    {/* <div>
                      <h2>Reason</h2>
                      <p>{this.props.reason}{" "}
                      </p>
                    </div> */}

                    <GridContainer>
                    <GridItem>
                      <NavPills
                        color="primary"
                        horizontal={{
                          tabsGrid: { xs: 12, sm: 4, md: 4 },
                          contentGrid: { xs: 12, sm: 8, md: 8 }
                        }}
                        tabs={[
                          {
                            tabButton: "Description",
                            tabIcon: Dashboard,
                            tabContent: (
                              <span>
                                <h5 className={classes.description}>
                                  {this.props.description}{" "}</h5>
                              </span>
                            )
                          },
                          {
                            tabButton: "Reason",
                            tabIcon: Schedule,
                            tabContent: (
                              <span>
                                <h5 className={classes.description}>
                                  {this.props.reason}{" "}</h5>

                              </span>
                            )
                          }
                        ]}
                      />
                    </GridItem>
            </GridContainer>


                  </div>

                </GridItem>
              </GridContainer>
              {/* Payment module does here */}
              <Payment />
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
    name: appState.item.name,
    description: appState.item.description,
    category: appState.item.category,
    reason: appState.item.reason,
    amount: appState.item.amount,
    total: appState.donation_amount.total,
    picture_url: appState.item.picture_url,
    item_url: appState.item.item_url
  };
}
export default withStyles(profilePageStyle)(connect(mapStateToProps)(Donation))