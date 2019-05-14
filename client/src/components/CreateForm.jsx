import React, { useState, useEffect, useContext } from 'react'
import { sendItemData } from '../actions/actions'
import { AuthContext } from '../lib/auth'
import { connect } from 'react-redux'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";



// const fs = require('fs');
// const imgurUploader = require('imgur-uploader');

// imgurUploader(fs.readFileSync('cat.jpg'), { title: 'Hello!' }).then(data => {
//   console.log(data);
//   /*
//   {
//       id: 'OB74hEa',
//       link: 'http://i.imgur.com/jbhDywa.jpg',
//       title: 'Hello!',
//       date: Sun May 24 2015 00:02:41 GMT+0200 (CEST),
//       type: 'image/jpg',
//       ...
//   }
//   */
// });


const CreateForm = props => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    connect(user)
  }, [user])

  const [values, setValues] = useState({
    requestor_id: user.user_id,
    name: '',
    description: '',
    category: '',
    reason: '',
    amount: '',
    picture_url: '',
    item_url: '',
  });

  const { classes, ...rest } = props;

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function sendItemCreated(e) {
    e.preventDefault()
    sendItemData(values)
    // get item data and use to create url?
  }

  return (
    <div
      className={classes.section}
    >
      <GridContainer justify="center">
        <GridItem cs={12} sm={12} md={8}>
          <h2
            className={classes.title}
          >Tell us about your big wish</h2>
          <h4
            className={classes.description}
          >
            Let your donors know what you want and why you want it.<br></br>
            Be sure to add all the pertinent details.
            </h4>
          <form onSubmit={sendItemCreated}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Item title"
                  id="name"
                  value={values.name}
                  onChange={handleChange('name')}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomDropdown
                  buttonText="Category"
                  id="category"
                  value={values.category}
                  onChange={handleChange('category')}
                  dropdownHeader="Select a Category"
                  dropdownList={['Birthday', 'Winter Holiday', 'Anniversary', 'Wedding', 'Other']}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <CustomInput
                labelText="Description"
                id="description" 
                value={values.description}
                onChange={handleChange('description')}
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5
                }}
              />
              <CustomInput
                labelText="Reason"
                id="reason" 
                value={values.reason}
                onChange={handleChange('reason')}
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5
                }}
              />
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Amount"
                  id="amount" 
                  value={values.amount}
                  onChange={handleChange('amount')}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridContainer justify="center">
                <GridItem
                  xs={12}
                  sm={12}
                  md={4}
                  className={classes.textCenter}
                >
                  <Button type="submit" color="primary">Submit</Button>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );

}

// function mapStateToProps(appState) {

//   return {
//     user: appState.user,
//     // values: ownProps.values
//   }
// }

export default withStyles(workStyle)(CreateForm)
// && connect(mapStateToProps)(CreateForm)

