import React, { useState, useEffect, useContext } from 'react'
import { sendItemData, getUser } from '../actions/actions'
import { AuthContext } from '../lib/auth'
import { connect } from 'react-redux'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
// import Button from "@material-ui/core/Button"
// import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
// import InputLabel from "@material-ui/core/InputLabel"
// import TextField from '@material-ui/core/TextField';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import CustomSelect from "components/CustomInput/CustomSelectNA.jsx";
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
    getUser(user)
  }, [user])


  const [values, setValues] = useState({
    requestor_id: '',
    name: '',
    description: '',
    category: '',
    reason: '',
    amount: '',
    picture_url: '',
  });

  const { classes,
    // ...rest 
  } = props;

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value, requestor_id: props.userData.user_id });
  };

  function sendItemCreated(e) {
    // e.preventDefault()
    sendItemData(values)
    // setValues({
    //   ...values,
    //   name: '',
    //   description: '',
    //   category: '',
    //   reason: '',
    //   amount: '',
    //   picture_url: '',
    // })
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
                  name="name"
                  type="text"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: handleChange('name')
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomSelect
                  labelText="Category"
                  value={values.category}
                  input={<Input name="category" id="category" />}
                  name="category"
                  dropdownList={['Birthday', 'Winter Holiday', 'Anniversary', 'Wedding', 'Other']}
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: handleChange('category'),
                  }}
                >
                </CustomSelect>
              </GridItem>
              <CustomInput
                labelText="Description"
                id="description"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                  onChange: handleChange('description')
                }}
              />
              <CustomInput
                labelText="Reason"
                id="reason"
                formControlProps={{
                  fullWidth: true,
                  className: classes.textArea
                }}
                inputProps={{
                  multiline: true,
                  rows: 5,
                  onChange: handleChange('reason')
                }}
              />
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Picture link"
                  id="picture_url"
                  name="picture_url"
                  type="text"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: handleChange('picture_url')
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <CustomInput
                  labelText="Amount"
                  id="amount"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: handleChange('amount'),
                    type: "number",
                    inputProps: { min: 0, step: 0.01 }
                  }}
                />
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={4}
                className={classes.textCenter}
              >
              {/* set button to load the item after submit? */}
                <Button type="submit" color="primary">Submit</Button>
              </GridItem>
            </GridContainer>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );

}

function mapStateToProps(appState) {
  return {
    userData: appState.user,
  }
}

export default withStyles(workStyle)(connect(mapStateToProps)(CreateForm))

