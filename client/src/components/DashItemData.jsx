import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { getItemData } from "../actions/actions"
import { Link } from 'react-router-dom'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";

// @material-ui/icons
// import AccessTime from "@material-ui/icons/AccessTime";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";
import Table from "components/Table/Table.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";


const DashItemData = props => {
  const { classes } = props;
  
  useEffect(() => {
    getItemData(props.match.params.item_id)
  }, [props.match.params.item_id])

  const donations = props.donations.map(d => {
    console.log(d)
    if (d.donor_name === '') {
      d.donor_name = 'Anonymous'
    }

    return d
  })

  console.log('donations', donations)

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>{props.item.name}</h2>
          <Link className="back-link" to={"/donation/" + props.match.params.item_id}><h4 className={classes.title}>Go to donation page</h4></Link>
          <h5 className={classes.description}>Progress toward goal: {props.percent}%</h5>
          <br />
          <CustomLinearProgress
            variant="determinate"
            color="primary"
            value={props.item.percent}
          />
          <h5 className={classes.description}>${Number(props.item.donAmount).toFixed(2)} of ${Number(props.item.amount).toFixed(2)}</h5>
        </GridItem>
      </GridContainer>
      <br />
      <div>
        <GridContainer>
          {/* start chart data */}
          <div className="chart_wrapper" style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart
                width={500}
                height={400}
                data={donations}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="donor_name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  fill="#8e24aa"
                  stroke="#8e24aa"
                />
                <Line type="monotone" dataKey={props.donations.amount} stroke="#11998e" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          {/* end chart data */}
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>This wish</h4>
              </CardHeader>
              <CardBody>
                <img src={props.item.picture} alt={props.item.name} className="itemIMG"></img>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Donors</h4>
              </CardHeader>
              <CardBody>
                <div className="donor-list-dashboard">
                <Table
                  tableHeaderColor="primary"
                  tableHead={["Name", "Donation"]}
                  tableData={props.donationData}
                />
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}


function mapStateToProps(appState) {
  return {
    item: appState.item,
    percent: appState.item.percent > 0 ? appState.item.percent : 0,
    donations: appState.donations,
    donationData: appState.donations.map(don => [don.donor_name === "" ? "Anonymous" : '' + don.donor_name, don.amount === "" ? "$0.00" : '$' + don.amount.toFixed(2)]),
  }
}

export default withStyles(productStyle)(connect(mapStateToProps)(DashItemData))
