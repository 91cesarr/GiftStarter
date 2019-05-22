import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { getItemData } from "../actions/actions"

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

const DashItemData = props => {
  const { classes } = props;

  useEffect(() => {
    getItemData(props.match.params.item_id)

  }, [props.match.params.item_id])

  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>{props.item.name}</h2>
          <h5 className={classes.description}>Progress toward goal: {props.item.percent}%</h5>
          <CustomLinearProgress
            variant="determinate"
            color="primary"
            value={props.item.percent}
          />
          <h5 className={classes.description}>${props.item.donAmount} of ${props.item.amount}</h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>This wish</h4>
              </CardHeader>
              <CardBody>
                <img src={props.item.picture} alt={props.item.name}></img>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Donors</h4>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="info"
                  tableHead={["Name", "Donation"]}
                  tableData={props.donationData}
                />
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
    donations: appState.donations,
    donationData: appState.donations.map(don => ['' + don.donor_name, '' + '$' + don.amount]),
  }
}

export default withStyles(productStyle)(connect(mapStateToProps)(DashItemData))
