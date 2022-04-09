import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle.js";
import { FormHelperText, Input, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function CustomDropDown(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    rtlActive,
    nameValue,
    helperTextId,
    isHelperText,
    helperText,
    ...rest
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
    [" " + classes.labelRTL]: rtlActive
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });
  let newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined,
    step: inputProps && inputProps.step ? inputProps.step : undefined
  };
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Select
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          select: classes.input,
          selectMenu: classes.input
        }}
        input={
          <Input
            classes={{
              input: classes.input,
              underline: underlineClasses
            }}
          />
        }
        {...rest}
        id={id}
        {...inputProps}
        inputProps={newInputProps}
      >
        {nameValue.map(n => (
          <MenuItem value={n.value}>{n.name}</MenuItem>
        ))}
      </Select>
      {isHelperText ? (
        <FormHelperText id={helperTextId} error={error}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

CustomDropDown.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  rtlActive: PropTypes.bool
};
