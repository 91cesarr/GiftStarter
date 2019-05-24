import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from '../lib/auth'
import { connect } from "react-redux"
import { getUser, getItemData, donate, donation, getDonList } from "../actions/actions";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Share from "@material-ui/icons/Share";
import List from "@material-ui/icons/List";
import CardGiftcardRounded from "@material-ui/icons/CardGiftcardRounded"
import NavPills from "components/NavPills/NavPills.jsx";

// share page buttons
import { Facebook, Twitter } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";

import ReactStripeCheckout from 'react-stripe-checkout';

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

const DonItemData = (props) => {
  const { user } = useContext(AuthContext)
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    getUser(user)
    getItemData(props.item.item_id)
    getDonList(props.item.item_id)
  }, [user, props.item.item_id])

  // const item_id = props.item.item_id
  const url = 'http://wishbig.com/donation/' + props.item.item_id
  const shareText = 'Check this out! Help buy ' + props.item.name
  // const donor_id = props.user.user_id
  // const requestor_id = props.item.requestor_id
  const { classes } = props;

  const onToken = (token) => {
    donation(name, amount, props.item.item_id, props.item.requestor_id)

    fetch('/api/donation', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json()
        // reload the page
        .then(window.location.reload())
        .then(data => {
          alert(`Thank you for your donation!`
            //insert inside `` above  ${data.email}
          );
        });
    });
  }

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>{props.item.name}</h2>
          <h5 className={classes.description}>
            {props.item.reason}
          </h5>
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
                <h4 className={classes.title}>${props.item.remainder}</h4>
              </div>
            </div>
          </div>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{props.item.name}</h4>
              </CardHeader>
              <CardBody>
                <img src={props.item.picture} alt={props.item.name} className="itemIMG" />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <NavPills
              color="info"
              horizontal={{
                tabsGrid: { xs: 12, sm: 4, md: 6 },
                contentGrid: { xs: 12, sm: 8, md: 6 }
              }}
              tabs={[
                {
                  tabButton: "Donate",
                  tabIcon: CardGiftcardRounded,
                  tabContent: (
                    <span>
                      <form className="donate_form" onSubmit={donate}>
                        <GridContainer>
                          <GridItem>
                            <CustomInput
                              labelText="Name"
                              name="donor_name"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                type: "text",
                                disabled: (props.item.remainder === 0 ? true : false),
                                placeholder: "",
                                value: name,
                                onChange: (e) => setName(e.target.value),
                                autoComplete: "off"
                              }} />
                            <CustomInput
                              labelText="Donation Amount"
                              name="amount"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                type: "number",
                                // inputProps: { min: 0, step: 10.00 },
                                disabled: (props.item.remainder === 0 ? true : false),
                                placeholder: "$",
                                value: amount,
                                onChange: (e) => setAmount(e.target.value),
                                autoComplete: "off"
                              }} />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem>
                            <div className={classes.title}></div>
                            <ReactStripeCheckout
                              disabled={(props.item.remainder === 0 ? true : false)}
                              name={props.item.name}
                              label={(props.item.remainder === 0 ? 'Item amount met thank you' : 'Pay With Card')}
                              donor_name={name}
                              amount={amount * 100}
                              item_id={props.item.item_id}
                              donor_id={props.user.user_id}
                              requestor_id={props.item.requestor_id}
                              stripeKey="pk_test_COhX3mfbC1fLgVYup2ylmIDk00dJeKzFpK"
                              token={onToken}
                            />
                          </GridItem>
                        </GridContainer>
                      </form>
                    </span>
                  )
                },
                {
                  tabButton: "Share",
                  tabIcon: Share,
                  tabContent: (
                    <div>
                      <h3 className={classes.title}>Share this wish</h3>
                      <Facebook url={url} shareText={shareText} />
                      <Twitter url={url} shareText={shareText} />
                    </div>
                  )
                },
                {
                  tabButton: "Donor List",
                  tabIcon: List,
                  tabContent: (
                    <div className="donor-list">
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Name", "Donation"]}
                      tableData={props.donationData}
                    />
                    </div>
                  )
                },
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

function mapStateToProps(appState) {
  return {
    user: appState.user,
    item: appState.item,
    donations: appState.donations,
    donationData: appState.donations.map(don => [don.donor_name === "" ? "Anonymous" : '' + don.donor_name, don.amount === "" ? "$0" : '' + '$' + don.amount]),
  }
}
export default withStyles(productStyle)(connect(mapStateToProps)(DonItemData))