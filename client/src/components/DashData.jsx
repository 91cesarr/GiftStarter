import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import moment, { Date } from "moment"
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
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
// import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from "components/CustomButtons/Button.jsx";

// alternate dashboard items
// import DashboardAlt from "../Dashboard/views/Dashboard"


import { bugs, website, server } from "variables/general.jsx";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart
// } from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const dashboardRoutes = [];

const DashData = props => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    getUser(user)
  }, [user])

  function getItemsList(e) {
    e.preventDefault()
    getItems(props.userData.user_id)
  }

  // getItem(item_id)
  // getDonList(props.item.item_id)

  // const myItems = items.filter((user_id, requestor_id) => {
  //   return user_id === requestor_id
  // })

  // const donTotal = donations.reduce(function (a, b) {
  //   return a + b.amount
  // }, 0)

  // const remaining = props.item.amount - donTotal

  const state = {
    value: 0
  };
  const handleChange = (event, value) => {
    this.setState({ value });
  };

  const handleChangeIndex = index => {
    this.setState({ value: index });
  };

  const { classes, ...rest } = props;
  return (
    <div>
      {/* <div height="400px">
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="WishBig"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          {...rest}
        />
      </div><div> */}
      <GridItem xs={12} sm={12} md={6}>
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
              tableHead={["ID", "Name", "Amount"]}
              tableData=
              {props.items}

            // {[
            //   ["1", "Dakota Rice", "$36,738", "Niger"],
            //   ["2", "Minerva Hooper", "$23,789", "Curaçao"],
            //   ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
            //   ["4", "Philip Chaney", "$38,735", "Korea, South"]
            // ]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <hr></hr><hr></hr>
      <GridContainer>
        {/* <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                  </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem> */}
        {/* <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>$34,245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
                </div>
            </CardFooter>
          </Card>
        </GridItem> */}
        {/* <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
                </div>
            </CardFooter>
          </Card>
        </GridItem> */}
        {/* <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
                </div>
            </CardFooter>
          </Card>
        </GridItem> */}
      </GridContainer>
      <GridContainer>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                increase in today sales.
                </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
                </div>
            </CardFooter>
          </Card>
        </GridItem> */}
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>
                Last Campaign Performance
                </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
                </div>
            </CardFooter>
          </Card>
        </GridItem> */}
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>
                Last Campaign Performance
                </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
                </div>
            </CardFooter>
          </Card>
        </GridItem> */}
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
                </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <hr></hr>
      <hr></hr>
      {/* <DashboardAlt></DashboardAlt> */}

      <Footer />
      {/* </div> */}
    </div>
  );
}

DashData.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(appState) {
  console.log("state:", appState.items)
  console.log('mapped', appState.items.map(item => [item.item_id, item.name, item.amount]));
  return {
    userData: appState.user,
    item: appState.item,
    items: appState.items.map(item => ['' + item.item_id, item.name, '' + item.amount]),
    donations: appState.donations
  }
}

export default withStyles(dashboardStyle)(connect(mapStateToProps)(DashData))

