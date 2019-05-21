import React from "react";
import { connect } from 'react-redux'

// react plugin for creating charts
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";

// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Table from "components/Table/Table.jsx";
// import Update from "@material-ui/icons/Update";
// import Accessibility from "@material-ui/icons/Accessibility";

// // Sections for this page
import DashData from "./DashData.jsx";

// import { emailsSubscriptionChart } from "variables/charts.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
// import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

// ##############################
// // // Email Subscriptions
// #############################

const emailsSubscriptionChart = {
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
  },
  options: {
    axisX: {
      showGrid: false
    },
    low: 0,
    high: 1000,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};
// ##############################
// // // variables used to create animation on charts
// #############################
var delays2 = 80,
  durations2 = 500;


const DashItemData = props => {
  const { classes } = props;
  return (
    <div className={classes.section}>
      {/* <GridContainer justify="center"> */}
      {/* <GridItem xs={12} sm={12} md={28}> */}
      <DashData></DashData>
      {/* </GridItem> */}
      {/* </GridContainer> */}
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>{props.item.name}NAME</h2>
          <h5 className={classes.description}>Progress toward goal</h5>
          <div className="progBarDiv">
            <div><h5 className={classes.description}>${props.item.donAmount}</h5></div>
            <div><CustomLinearProgress
              variant="determinate"
              color="primary"
              value={65}
            // {props.item.percent}
            /></div>
            <div><h5 className={classes.description}>${props.item.amount}</h5></div>
          </div>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <div>
              <img src={props.item.picture} alt={props.item.name}></img>
            </div>
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            {/* Item data - goal, remainder, total # of donors */}
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Donors</h4>
                {/* <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p> */}
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="info"
                  tableHead={["Name", "Donation"]}
                  tableData={[
                    ["Dakota Rice", "$36,738"],
                    ["Minerva Hooper", "$23,789"],
                    ["Sage Rodriguez", "$56,142"],
                    ["Philip Chaney", "$38,735"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="info">
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
                <h4 className={classes.cardTitle}>Donations</h4>
                {/* <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p> */}
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}


function mapStateToProps(appState) {
  console.log("full:", appState)
  console.log("state:", appState.items)
  // console.log('mapped', appState.items.map(item => [item.item_id, item.name, item.amount]));
  return {
    userData: appState.user,
    item: appState.item,
    items: appState.items.map(item => ['' + item.item_id, item.name, '' + item.amount, '' + item.donAmount, '' + item.remainder, '' + item.percent]),
    donations: appState.donations
  }
}

export default withStyles(productStyle)(connect(mapStateToProps)(DashItemData))
