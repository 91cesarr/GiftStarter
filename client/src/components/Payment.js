import React, { useState, useEffect, useContext } from "react"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import { AuthContext } from "../lib/auth"
import StripeCheckout from 'react-stripe-checkout';

const Payment = props => {
  // onToken = (token) => {
  //   fetch('/save-stripe-token', {
  //     method: 'POST',
  //     body: JSON.stringify(token),
  //   }).then(response => {
  //     response.json().then(data => {
  //       alert(`We are in business, ${data.email}`);
  //     });
  //   });
  // }
  const [amount, setAmount] = useState("")
  const [payment_type, setPayment_type] = useState("")
  const { donation } = useContext(AuthContext)

  function donate(e) {
    e.preventDefault()
    donation(amount,payment_type)
        .then(() => {
          props.history.push("/")
        })
  }
    const { classes } = props;
    return (
      <div className={classes.sections}>
        <div className={classes.container}>
          <div className={classes.space50} />
          <div id="inputs">
            <div className={classes.title}>
              <h3>Donate</h3>
            </div>
            <form onSubmit={donate}>
            <GridContainer>
              {/* <GridItem xs={12} sm={4} md={4} lg={3}>
                <CustomInput
                  labelText="Name"
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem> */}
              <GridItem xs={12} sm={4} md={4} lg={3}>
                <CustomInput
                  labelText="Donation Amount"
                  name="category"
                  type="text"
                  id="float"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                  onChange: (e) => setAmount(e.target.value)
}}
/>
              </GridItem>
              <GridItem xs={12} sm={4} md={4} lg={3}>
                <CustomInput
                  labelText="Credit Card Number"
                  name="amount"
                  type="text"
                  id="font-awesome"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                  onChange: (e) => setPayment_type(e.target.value),
                  endAdornment: (
                      <InputAdornment position="end">
                        <i className="fas fa-credit-card" />
                      </InputAdornment>
                    )
                  }}
                />
              </GridItem>
            </GridContainer>
          <div id="checkRadios">
            <GridContainer>
            <GridItem xs={12} sm={6} md={4} lg={3}>
                <div className={classes.title}>
                </div>
                <div>
                  {/* <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.checkedA}
                        onChange={this.handleChange("checkedA")}
                        value="checkedA"
                        classes={{
                          switchBase: classes.switchBase,
                          checked: classes.switchChecked,
                          icon: classes.switchIcon,
                          iconChecked: classes.switchIconChecked,
                          bar: classes.switchBar
                        }}
                      />
                    }
                    classes={{
                      label: classes.label
                    }}
                    label="Stay anonymous"
                  /> */}
                </div>
                <div>
                </div>
                <Button
                type="submit"
                color="primary" size="lg">
                  Submit
                </Button>
                    <StripeCheckout
                      // token={this.onToken}
                      stripeKey="pk_test_COhX3mfbC1fLgVYup2ylmIDk00dJeKzFpK"
                    />
              </GridItem>
            </GridContainer>
          </div>
            </form>
          </div>
          <div className={classes.space70} />
        </div>
      </div>
    );
  }

export default withStyles(basicsStyle)(Payment);
