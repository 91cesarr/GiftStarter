import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from '../lib/auth'
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
import { getUser, getItemData, getTotal, donation, donate } from "../actions/actions";
import ReactStripeCheckout from 'react-stripe-checkout';


const Donation = (props) => {
  const { user } = useContext(AuthContext)
  // const { item_id } = useContext(AuthContext)
  const [value, setValue] = useState("")

  useEffect(() => {
    getUser(user)
    getTotal(id)
    getItemData(id)
  }, [user, id])
  const item_id = props.item.item_id
  const id = props.match.params.item_id
  // let requestor_id = props.requestor_id
  const url = 'http://localhost:3000' + props.match.url
  const shareText = 'Check this out! ' + props.name
  const amount = value
  const rem = props.item.amount - props.total.total
  const donor_id = props.user.user_id
  const { classes, ...rest } = props;
  console.log(props)
  const onToken = (token) => {
    donation(amount,item_id,donor_id)
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
                  <img src={props.item.picture} alt="..." className="itemIMG" />
                  <div className={classes.profile}>
                    <div className={classes.name}>
                      <h2 className={classes.title}>{props.item.name}</h2>
                      <div>
                      <Facebook url={url} />
                      <Twitter url={url} shareText={shareText} />
                      </div>
                      <div className="wrap_pricing">
                      <div className="total_amount">
                          <h3 className={classes.title}>Total Amount <Tooltip
                            id="tooltip-top"
                            title="This is the total amount of the current item"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <i className={"fas fa-info-circle"} />
                          </Tooltip></h3>  
                          <div>                        
                          <h4 className={classes.title}>${props.item.amount}</h4>
                          </div>
                      </div>
                      <div className="remaining_amount">
                          <h3 className={classes.title}>Remaining Amount <Tooltip
                            id="tooltip-top"
                            title="This is the remaining amount left for the current item"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <i className={"fas fa-info-circle"} />
                          </Tooltip></h3>
                          <div>
                          <h4 className={classes.title}>${rem}</h4>
                          </div>
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
                                <p className={classes.description}>
                                  {props.item.description}{" "}</p>
                              </span>
                            )
                          },
                          {
                            tabButton: "Reason",
                            tabIcon: Schedule,
                            tabContent: (
                              <span>
                                <p className={classes.description}>
                                  {props.item.reason}{" "}</p>
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
                                          inputProps: { min: 0,step: 1.00 },
                                          disabled:(rem === 0 ? true : false),                                          
                                          placeholder: "$",
                                          value:value,
                                          onChange: (e) => setValue(e.target.value),                                  
                                          autoComplete: "off"
                        }} />               
                                             
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer>
                                    <GridItem>
                                      <div className={classes.title}></div>
                                      <ReactStripeCheckout 
                                        disabled={(rem === 0 ? true : false)}
                                        name={props.item.name}
                                        label={(rem === 0 ? 'Item amount met thank you' : 'Pay With Card')}
                                        amount={value*100}
                                        item_id={props.item.item_id}
                                        // donor_id={props.user.user_id}
                                        // requestor_id={props.requestor_id}
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
              <br/>
              <br/>
              <br/>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
function mapStateToProps(appState) {
  return {
    user: appState.user,
    item: appState.item,
    total: appState.donation_amount
    }
}
export default withStyles(profilePageStyle)(connect(mapStateToProps)(Donation))