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
import CustomInput from "components/CustomInput/CustomInput.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import CardGiftcardRounded from "@material-ui/icons/CardGiftcardRounded"
import Schedule from "@material-ui/icons/Schedule";
import NavPills from "components/NavPills/NavPills.jsx";
import Chat from "@material-ui/icons/Chat";

import CustomTabs from "components/CustomTabs/CustomTabs.jsx";


// share page buttons
import { Facebook, Twitter } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'


import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";
// Donation actions
import { connect } from "react-redux"
// Payment Module
// import Payment from "../components/Payment"
import { getItem, getTotal, donation, donate, getUser } from "../actions/actions";
import ReactStripeCheckout from 'react-stripe-checkout';


class Donation extends Component {
  state = {
    // initial state
    value: "",
    user: ""
  }

  componentDidMount() {
    const id = this.props.match.params.item_id
    const user = this.props.match.params.user_id
    getItem(id)
    getTotal(id)
    getUser(user)
    this.setState({
      value: ""
    })
  }
  componentWillMount() {

  }
  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };
  render() {
    let requestor_id = this.props.requestor_id
    const value = this.state.value
    const item_id = this.props.item_id
    const url = 'http://localhost:3000' + this.props.match.url
    const shareText = 'Check this out! ' + this.props.name
    const rem = this.props.amount - this.props.total
    const { classes, ...rest } = this.props;
    console.log("userId",this.props.user_id)
    console.log("user",this.props.user)
    const onToken = (token) => {
      donation(value,item_id,requestor_id)
      fetch('/api/donation', {
        method: 'POST',
        body: JSON.stringify(token),
      }).then(response => {
        response.json().then(data => {
          alert(`Thank you for your donation!`
          //insert inside `` above  ${data.email}
          );
        });
      });
    }
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
                      <Facebook url={url} />
                      <Twitter url={url} shareText={shareText} />
                      <div className="wrap_pricing">
                      <div className="total_amount">
                          <h3>Total Amount <Tooltip
                            id="tooltip-top"
                            title="This is the total amount of the current item"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <i className={"fas fa-info-circle"} />
                          </Tooltip></h3>                          
                        <h5>${this.props.amount}</h5>
                      </div>
                      <div className="remaining_amount">
                          <h3>Remaining Amount <Tooltip
                            id="tooltip-top"
                            title="This is the remaining amount left for the current item"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <i className={"fas fa-info-circle"} />
                          </Tooltip></h3>
                        <h5>${rem}</h5>
                      </div>
                      </div>
                    </div>
                    <GridContainer>
                      <GridItem>
                        <CustomTabs
                          headerColor="primary"
                          tabs={[                      
                            {
                              tabName: "Recent Donations",
                              tabIcon: Chat,
                              tabContent: (
                                <div>
                                <p className={classes.textCenter}>
                                  I think that’s a responsibility that I have, to push
                                  possibilities, to show people, this is the level that
                                  things could be at. I will be the leader of a company
                                  that ends up being worth billions of dollars, because
                                  I got the answers. I understand culture. I am the
                                  nucleus. I think that’s a responsibility that I have,
                                  to push possibilities, to show people, this is the
                                  level that things could be at.
                        </p>
                                  <p className={classes.textCenter}>
                                    I think that’s a responsibility that I have, to push
                                    possibilities, to show people, this is the level that
                                    things could be at. I will be the leader of a company
                                    that ends up being worth billions of dollars, because
                                    I got the answers. I understand culture. I am the
                                    nucleus. I think that’s a responsibility that I have,
                                    to push possibilities, to show people, this is the
                                    level that things could be at.
                        </p>
                        </div>
                              )
                            }
                          ]}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                    <GridItem>
                      <NavPills
                        color="primary"
                        horizontal={{
                          tabsGrid: { xs: 12, sm: 4, md: 6 },
                          contentGrid: { xs: 12, sm: 8, md: 6 }
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
                          },
                          {
                            tabButton: "Donate",
                            tabIcon: CardGiftcardRounded,
                            tabContent: (
                              <span>
                                <form className="donate_form" onSubmit={donate}>
                                  <GridContainer>
                                   
                                    <GridItem>
                                      <CustomInput
                                        labelText="Donation Amount"
                                        name="amount"
                                        formControlProps={{
                                          fullWidth: true
                                        }}
                                        inputProps={{
                                          type:"number",
                                          inputProps: { min: 0,step: 0.01 },
                                          onChange: this.handleChange,
                                          value: this.state.value,
                                          autoComplete: "off"
                                    }} />                                      
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer>
                                    <GridItem>
                                      <div className={classes.title}></div>
                                      <ReactStripeCheckout
                                        name={this.props.name}
                                        amount={this.state.value*100}
                                        item_id={this.props.item_id}
                                        requestor_id={this.props.requestor_id}
                                        stripeKey="pk_test_COhX3mfbC1fLgVYup2ylmIDk00dJeKzFpK"
                                        token={onToken}
                                      />
                                    </GridItem>
                                  </GridContainer>
                                </form>
                              </span>
                            )
                          },
                        ]}
                      />
                      </GridItem>
                    </GridContainer>
                  </div>
                </GridItem>
              </GridContainer>
              {/* Payment module goes here
              <Payment /> */}
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
    user: appState.user.user_id,
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
    item_url: appState.item.item_url,
  };
}
export default withStyles(profilePageStyle)(connect(mapStateToProps)(Donation))