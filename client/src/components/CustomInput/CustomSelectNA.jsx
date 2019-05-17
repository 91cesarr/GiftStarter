import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from "@material-ui/core/MenuList";

import customSelectStyle from "assets/jss/material-kit-react/components/customSelectStyleNA.jsx";

function CustomSelect({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    white,
    inputRootCustomClasses,
    success,
    dropdownList,
    dropdownHeader,
    hoverColor,
    rtlActive,
    noLiPadding
  } = props;

  const dropdownItem = classNames({
    [classes.dropdownItem]: true,
    [classes[hoverColor + "Hover"]]: true,
    [classes.noLiPadding]: noLiPadding,
    [classes.dropdownItemRTL]: rtlActive
  });

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input]: true,
    [classes.whiteInput]: white
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl
  }

  return (
    <FormControl {...formControlProps} className={formControlClasses}>
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        value={props.value}
        classes={{
          // input: inputClasses,
          root: marginTop,
          disabled: classes.disabled,
          // underline: underlineClasses
        }}
        id={id}
        {...inputProps}
      >
        <MenuList role="menu" className={classes.menuList}>
          {/* {dropdownHeader !== undefined ? (
            <MenuItem
              // onClick={() => this.handleClose(dropdownHeader)}
              className={classes.dropdownHeader}
            >
              {dropdownHeader}
            </MenuItem>
          ) : null} */}
          {dropdownList.map((prop, key) => {
            return (
              <MenuItem
                key={key}
                // onClick={() => this.handleClose(prop)}
                className={dropdownItem}
                value={prop.value}
              >
                {prop}
              </MenuItem>
            );
          })}
        </MenuList>
      </Select>
    </FormControl>
  );
}

CustomSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  dropdownList: PropTypes.array,
  dropdownHeader: PropTypes.node,
  hoverColor: PropTypes.oneOf([
    "black",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  rtlActive: PropTypes.bool,
  noLiPadding: PropTypes.bool,
};

export default withStyles(customSelectStyle)(CustomSelect);
