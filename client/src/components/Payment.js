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

const Payment = props => {
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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     checked: [24, 22],
  //     selectedEnabled: "b",
  //     checkedA: true,
  //     checkedB: false
  //   };
  //   this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  // }
  // componentDidMount() {

  // }
  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.checked });
  // };
  // handleChangeEnabled(event) {
  //   this.setState({ selectedEnabled: event.target.value });
  // }
  // handleToggle(value) {
  //   const { checked } = this.state;
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   this.setState({
  //     checked: newChecked
  //   });
  // }
  // render() {
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
