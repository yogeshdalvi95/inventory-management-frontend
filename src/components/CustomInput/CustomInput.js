import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle.js";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function CustomInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    helperTextId,
    isHelperText,
    helperText,
    labelProps,
    inputProps,
    error,
    success,
    rtlActive,
    noMargin,
    ...rest
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error,
    [" " + classes.labelRTL]: rtlActive,
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });

  const formControlClasses = classNames({
    [formControlProps.className]: true,
    [classes.formControl]: noMargin ? false : true,
    [classes.noMarginFormControl]: noMargin ? true : false,
  });

  let newInputProps = {
    maxLength:
      inputProps && inputProps.maxLength ? inputProps.maxLength : undefined,
    minLength:
      inputProps && inputProps.minLength ? inputProps.minLength : undefined,
    step: inputProps && inputProps.step ? inputProps.step : undefined,
  };

  return (
    <FormControl
      {...formControlProps}
      className={formControlClasses}
      styles={
        props.noTopMargin
          ? {
              marginTop: "0px",
            }
          : null
      }
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          styles={
            props.noTopMargin
              ? {
                  marginTop: "0px",
                }
              : null
          }
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses,
          input: classes.input,
        }}
        {...rest}
        id={id}
        {...inputProps}
        inputProps={newInputProps}
      />
      {isHelperText ? (
        <FormHelperText id={helperTextId} error={error}>
          {helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  rtlActive: PropTypes.bool,
};
