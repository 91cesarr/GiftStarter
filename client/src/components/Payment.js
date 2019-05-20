import React, { useState } from "react"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import ReactStripeCheckout from 'react-stripe-checkout';
import { donation, donate } from "../actions/actions";


const Payment = props => {
  const [amount, setAmount] = useState("")
  const { classes } = props;

  const onToken = (token) => {
    donation(amount)
    fetch('/api/donation', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

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
                  onChange: (e) => setAmount(e.target.value)}}/>
              </GridItem>
            </GridContainer>
          <div id="checkRadios">
            <GridContainer>
            <GridItem xs={12} sm={6} md={4} lg={3}>
                <div className={classes.title}></div>
                    <ReactStripeCheckout
                      name={'Stripe Test'}
                      description={'Stripe'}
                      amount={amount*100}
                      stripeKey="pk_test_COhX3mfbC1fLgVYup2ylmIDk00dJeKzFpK"
                      token={onToken}
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
