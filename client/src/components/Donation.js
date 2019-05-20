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
// import Payment from "../components/Payment"
import { getItem, getTotal, donation, donate } from "../actions/actions";
import ReactStripeCheckout from 'react-stripe-checkout';


class Donation extends Component {
  state = {
    // initial state
    value: ""
  }

  componentDidMount() {
    const id = this.props.match.params.item_id
    getItem(id)
    getTotal(id)
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
    const value = this.state.value
    const item_id = this.props.item_id
    const url = 'http://localhost:3000' + this.props.match.url
    const shareText = 'Check this out! ' + this.props.name
    const rem = this.props.amount - this.props.total
    const { classes, ...rest } = this.props;
    const onToken = (token) => {
      donation(value,item_id)
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
                      <div className="wrap_pricing">
                      <div className="total_amount">
                      <h3>Total Amount    <i className={"fas fa-info-circle"} /></h3>
                        <h5>${this.props.amount}</h5>
                      </div>
                      <div className="remaining_amount">
                      <h3>Remaining Amount    <i className={"fas fa-info-circle"} /></h3>
                        <h5>${rem}</h5>
                      </div>
                      </div>
                    </div>
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
                                <Facebook url={url} />
                                <Twitter url={url} shareText={shareText} />
                              </span>
                            )
                          },
                          {
                            tabButton: "Donate",
                            tabIcon: Schedule,
                            tabContent: (
                              <span>
                                <form onSubmit={donate}>
                                  <GridContainer>
                                    <GridItem xs={12} sm={6} md={6} lg={6}>
                                      <CustomInput
                                        labelText="Donation Amount"
                                        name="category"
                                        type="text"
                                        id="float"
                                        formControlProps={{
                                          fullWidth: true
                                        }}
                                        inputProps={{
                                          onChange: this.handleChange,
                                          value: this.state.value,
                                          autoComplete: "off"
                                        }} />
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer>
                                    <GridItem xs={12} sm={6} md={6} lg={6}>
                                      <div className={classes.title}></div>
                                      <ReactStripeCheckout
                                        name={this.props.name}
                                        amount={this.state.value*100}
                                        item_id={this.props.item_id}
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