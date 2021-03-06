import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";

function CustomLinkTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                if (key !== 0) {
                  return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={'table-header-' + key}
                    >
                      {prop}
                    </TableCell>
                  );
                } else {
                  return null
                }

              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, tableKey) => {
            return (
              <TableRow key={'item-row-' + tableKey}>
                {prop.map((prop, rowKey) => {
                  if (rowKey !== 0) {
                    return (
                      <TableCell className={classes.tableCell} key={'item-cell-' + rowKey}>
                        <Link className="back-link" to={'/dashboard/' + tableData[tableKey][0]}>{prop}</Link>
                      </TableCell>
                    );
                  } else {
                    return null
                  }
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomLinkTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomLinkTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomLinkTable);
