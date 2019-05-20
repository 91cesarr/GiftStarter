import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import { AuthContext } from '../lib/auth'
import { sendItemData } from '../actions/actions'
import './style.css';

// import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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

const Create = props => {
  const { signout, user } = useContext(AuthContext)


  function logout() {
    signout()
    props.history.push("/")
  }

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      flexBasis: 200,
    },
  }));

  const ranges = [
    {
      value: 'Birthday',
      label: 'Birthday',
    },
    {
      value: 'Winter Holiday',
      label: 'Winter Holiday',
    },
    {
      value: 'Anniversary',
      label: 'Anniversary',
    },
    {
      value: 'Wedding',
      label: 'Wedding',
    },
    {
      value: 'Other',
      label: 'Other',
    },
  ];

  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    description: '',
    category: '',
    catRange: '',
    reason: '',
    amount: '',
    pic_url: '',
    requestor_id: '',
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  function sendItemCreated(e) {
    e.preventDefault()
    sendItemData(values)
  }

  return (
    <div className="container">
      {/* move the username and logout button to the right and on the same line as the title. add profile button for profile page later */}
      <div className="createUser">
        <p>{user}</p>
        <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
      </div>
      <h1>Create Your Request</h1>


      <div className="temp-container">
        <div className="content">
          <div className={classes.root}>
            <form className="createForm" onSubmit={sendItemCreated}>
              <div className="createLine1">
                <div className="createName">
                  <TextField
                    id="createName"
                    className={classes.textField}
                    variant="outlined"
                    label="Item title"
                    value={values.name}
                    onChange={handleChange('name')}
                  />
                </div>
                <div className="createCat">
                  <TextField
                    select
                    id="createCat"
                    className={classes.textField}
                    variant="outlined"
                    label="Category"
                    value={values.catRange}
                    onChange={handleChange('catRange')}
                  >
                    {ranges.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
              <div className="createLine1">
                <div className="createDesc">
                  <TextField
                    id="createDesc"
                    label="Description"
                    multiline
                    rowsMax="4"
                    value={values.description}
                    onChange={handleChange('description')}
                    className={classes.textField}
                    margin="normal"
                    helperText="A brief description of the item itself."
                    variant="outlined"
                  />
                </div>
                <div className="createReason">
                  <TextField
                    id="createReason"
                    label="Reason"
                    multiline
                    rowsMax="4"
                    value={values.reason}
                    onChange={handleChange('reason')}
                    className={classes.textField}
                    margin="normal"
                    helperText="What will you do with this?"
                    variant="outlined"
                  />
                </div>
              </div>
              <div className="createLine1">
                <div className="createAmount">
                  {/* Need to make a $ format mask */}
                  <TextField
                    id="createAmount"
                    className={classes.textField}
                    variant="outlined"
                    label="Amount"
                    value={values.amount}
                    onChange={handleChange('amount')}
                    helperText="How much do you need? Don't forget shipping."
                    InputProps={{
                      startAdornment: <InputAdornment position="start">
                        <i className="material-icons">attach_money_rounded</i>
                      </InputAdornment>,
                    }}
                  />
                </div>
              </div>
              <div className="createImage">
                Set Image Upload Here
              </div>
              <div><Button type="submit" variant="contained" color="primary" className="itemDataButton">Submit</Button></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(appState) {

  return {
    item: appState.item,
    user: appState.user,

  }
}

export default connect(mapStateToProps)(Create)