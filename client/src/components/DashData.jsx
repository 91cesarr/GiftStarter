import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
// import moment, { Date } from "moment"
import { getUser, getItems, getItem, getDonList } from "../actions/actions"
import { AuthContext } from '../lib/auth'
import { connect } from 'react-redux'

// react plugin for creating charts
// import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Store from "@material-ui/icons/Store";
// import Warning from "@material-ui/icons/Warning";
// import DateRange from "@material-ui/icons/DateRange";
// import LocalOffer from "@material-ui/icons/LocalOffer";
// import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
// import Accessibility from "@material-ui/icons/Accessibility";
// import BugReport from "@material-ui/icons/BugReport";
// import Code from "@material-ui/icons/Code";
// import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
// import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
// import Tasks from "components/Tasks/Tasks.jsx";
// import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
// import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";
// import Header from "components/Header/Header.jsx";
// import Footer from "components/Footer/Footer.jsx";
// import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";

// alternate dashboard items
// import DashboardAlt from "../Dashboard/views/Dashboard"


// import { bugs, website, server } from "variables/general.jsx";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// const dashboardRoutes = [];

const DashData = props => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getUser(user)
  }, [user])

  function getItemsList(e) {
    e.preventDefault()
    getItems(props.userData.user_id)
  }

  // function openItem(e) {
  //   e.preventDefault()
  //   getItem(props.items.item_id)
  // }

  // getDonList(props.item.item_id)

  // const myItems = items.filter((user_id, requestor_id) => {
  //   return user_id === requestor_id
  // })

  // const donTotal = donations.reduce(function (a, b) {
  //   return a + b.amount
  // }, 0)

  // const remaining = props.item.amount - donTotal

  // const state = {
  //   value: 0
  // };

  // const handleChange = (event, value) => {
  //   this.setState({ value });
  // };

  // const handleChangeIndex = index => {
  //   this.setState({ value: index });
  // };

  const { classes } = props;
  return (
    <div>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>My Wishes</h4>
            <p className={classes.cardCategoryWhite}>
              Requested items as of
              {/* <span>{Date()}</span> */}
            </p>
          </CardHeader>
          <CardBody>
            <Button color="rose" size="sm" onClick={getItemsList}>Get your items</Button>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Amount", "Donated", "Remaining"]}
              tableData=
              {props.items}

            // add link for each line
            />
          </CardBody>
        </Card>
      </GridItem>
    </div>
  );
}

DashData.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(appState) {
  console.log("full:", appState)
  console.log("state:", appState.items)
  // console.log('mapped', appState.items.map(item => [item.item_id, item.name, item.amount]));
  return {
    userData: appState.user,
    item: appState.item,
    items: appState.items.map(item => ['' + item.item_id, item.name, '' + item.amount]),
    donations: appState.donations
  }
}

export default withStyles(dashboardStyle)(connect(mapStateToProps)(DashData))

