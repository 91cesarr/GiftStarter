import React, { useEffect, useState, useContext } from "react"
import { AuthContext } from '../lib/auth'
import { connect } from "react-redux"
import { getUser, getItemData, donate, donation, getDonList, getTotal } from "../actions/actions";

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

// toast notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//spring.io transitions
import { Spring, config } from 'react-spring/renderprops'

const DonItemData = (props) => {
  const { user } = useContext(AuthContext)
  const [amount, setAmount] = useState("")
  const [name, setName] = useState("")
    const total = props.item.item_id;
    const rem = props.item.amount - props.total.total;
    const url = "http://wishbig.com/donation/" + props.item.item_id;
    const { classes } = props;
    const greeting = `Hello, ` + name + ` Thank you for your donation!`
    const picture = props.item.picture
    const shareText = "Check this out! Help buy " + props.item.name;
  useEffect(() => {
    getUser(user)
    getItemData(props.item.item_id)
    getDonList(props.item.item_id)
    getTotal(total)
  }, [user, props.item.item_id, total])

        const onToken = token => {
          donation(
            name,
            amount,
            props.item.item_id,
            props.item.requestor_id
          );
          fetch("/api/donation", {
            method: "POST",
            body: JSON.stringify(token)
          }).then(response => {
            response.json().then(data => {
              toast(greeting, {
                className: 'toast',
                position: "bottom-right",
                autoClose: 2800,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
              });
              // sets a time out before reloading the page
              setTimeout(() => {
                window.location.reload();
              }, 3500);
            });
          });
        };

  // Brings in light tooltip from material ui
  const LightTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11
    }
  }))(Tooltip);

  return (
    <Spring
      from={{ opacity: 0, marginBottom: -500 }}
      to={{ opacity: 1, marginBottom: 100 }}
      delay='500'
      config={config.molasses}
    >
      {animStyle => (
        <div className={classes.section} style={animStyle}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <h2 className={classes.title + " text_left"}>
            Why I want {props.item.name}:
          </h2>
          <p className={classes.description + " text_left"}>
            {props.item.reason}
          </p>
          <div className="wrap_pricing">
            <div className="total_amount">
              <h3 className={classes.title}>
                Total Amount{" "}
                <LightTooltip
                  id="tooltip-top"
                  title={"Total amount requested for " + props.item.name}
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <i className={"fas fa-info-circle"} />
                </LightTooltip>
              </h3>
              <div>
                <h4 className={classes.title}>
                  ${Number(props.item.amount).toFixed(2)}
                </h4>
              </div>
            </div>
            <div className="remaining_amount">
              <h3 className={classes.title}>
                Remaining Amount{" "}
                <LightTooltip
                  id="tooltip-top"
                  title={"Remaining amount needed to fund " + props.item.name}
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <i className={"fas fa-info-circle"} />
                </LightTooltip>
              </h3>
              <div>
                <h4 className={classes.title}>${Number(rem).toFixed(2)}</h4>
              </div>
            </div>
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card className="img_card">
            <CardHeader className="title_name_image" color="primary">
              <h4>{props.item.name}</h4>
            </CardHeader>
            <CardBody>
              <img src={picture} alt={props.item.name} className="itemIMG" />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
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
                                disabled: rem <= 0.0 ? true : false,
                                placeholder: "",
                                value: name,
                                onChange: e => setName(e.target.value),
                                autoComplete: "off"
                              }}
                            />
                            <CustomInput
                              labelText="Donation Amount"
                              name="amount"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                type: "number",
                                inputProps: { min: 0 },
                                disabled: rem <= 0.0 ? true : false,
                                placeholder: "$",
                                value: amount,
                                onChange: e => setAmount(e.target.value),
                                autoComplete: "off"
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem>
                            <ReactStripeCheckout
                              disabled={rem <= 0.0 ? true : false}
                              name={props.item.name}
                              label={
                                rem <= 0.0
                                  ? "Donations have been met thank you!"
                                  : "Pay With Card"
                              }
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
                        tableHeaderColor="info"
                        tableHead={["Name", "Donation"]}
                        tableData={props.donationData}
                      />
                    </div>
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
      )}
    </Spring>
  );
}

function mapStateToProps(appState) {
  return {
    user: appState.user,
    item: appState.item,
    donations: appState.donations,
    donationData: appState.donations.map(don => [don.donor_name === "" ? "Anonymous" : don.donor_name, don.amount === "" ? "$0.00" : '$' + don.amount.toFixed(2)]),
    total: appState.donation_amount
  }
}
export default withStyles(productStyle)(connect(mapStateToProps)(DonItemData))