import React, { useEffect, useContext } from "react";
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip} from "recharts";
import PropTypes from "prop-types";
import moment from "moment"
import { getUser, getItems, getDonList } from "../actions/actions"
import { AuthContext, AuthRoute } from '../lib/auth'
import { connect } from 'react-redux'

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/TableLinked.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
// import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";

// Sections for this page
import DashItemData from "./DashItemData"

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
const DashData = props => {
  const { user } = useContext(AuthContext)
  // Chart item data
  useEffect(() => {
    getUser(user)
    getItems(props.userData.user_id)
    getDonList(props.item.item_id)
  }, [user, props.userData.user_id, props.item.item_id])
  const { classes } = props;
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>My Wishes</h4><br />
              <p className={classes.cardCategoryWhite}>
                Requested items as of&nbsp;
              <span>{moment().format("MMMM DD, YYYY")}</span>
              </p>
            </CardHeader>
            <CardBody>
              {/* start chart data */}
              <div className="chart_wrapper" style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <ComposedChart
                    width={500}
                    height={400}
                    data={props.donations}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      fill="#26c6da"
                      stroke="#26c6da"
                    />
                    <Line type="monotone" dataKey={props.donations.amount} stroke="#11998e" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              {/* end chart data */}
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Name", "Amount", "Donated", "Remaining"
                  // , "Status"
                ]}
                tableData={props.items}
              />
              <AuthRoute path="/dashboard/:item_id" component={DashItemData} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
    
  );
}

DashData.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(appState) {
  return {
    userData: appState.user,
    item: appState.item,
    items: appState.items.map(item => [
      '' + item.item_id,
      item.name,
      item.amount === "" ? "$0.00" : '$' + Number(item.amount).toFixed(2),
      item.donAmount === null ? "$0.00" : '$' + Number(item.donAmount).toFixed(2),
      item.remainder === null ? "$0.00" : '$' + Number(item.remainder).toFixed(2),
      // ,'' + item.status
    ]),
    donations: appState.donations
  }
}

export default withStyles(dashboardStyle)(connect(mapStateToProps)(DashData))
