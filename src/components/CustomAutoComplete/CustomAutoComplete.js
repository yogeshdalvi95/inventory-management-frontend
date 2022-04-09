import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Autocomplete from "@material-ui/lab/Autocomplete";
// @material-ui/icons
import {
  primaryColor,
  grayColor,
} from "../../assets/jss/material-dashboard-react.js";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/customInputStyle.js";
import { FormHelperText, TextField } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function CustomAutoComplete(props) {
  const classes = useStyles();

  const StyledTextField = styled(TextField)`
    label.Mui-focused {
      color: green;
    }
    .MuiInput-underline:after {
      border-color: ${primaryColor[0]};
    }
    .MuiInput-underline:before {
      border-color: ${grayColor[4]} !important;
    }
    .MuiFormLabel-root {
      color: #aaaaaa !important;
      font-size: 14px;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 400;
      line-height: 1.42857;
      letter-spacing: unset;
    }
  `;

  const {
    formControlProps,
    labelText,
    id,
    options,
    optionKey,
    autocompleteId,
    labelProps,
    inputProps,
    error,
    success,
    rtlActive,
    autoComplete,
    onChange,
    value,
    getOptionLabel,
    onHighlightChange,
    helperTextId,
    isHelperText,
    helperText,
    onTextFieldValueChange,
    isInputPropsPresent,
    inputRef,
    noMarginTop,
    ...rest
  } = props;

  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined,
  });

  return (
    <Autocomplete
      id={autocompleteId}
      options={options}
      getOptionLabel={
        getOptionLabel ? getOptionLabel : (option) => option[optionKey]
      }
      onHighlightChange={onHighlightChange ? onHighlightChange : null}
      onChange={onChange}
      value={value}
      {...rest}
      classes={{
        root: marginTop,
        input: classes.input,
        popper: classes.input,
        listbox: classes.input,
      }}
      renderInput={(params) => (
        <>
          {isInputPropsPresent ? (
            <StyledTextField
              id={id}
              inputRef={inputRef}
              {...params}
              style={{
                margin: noMarginTop ? "0" : "27px 0 0 0",
              }}
              onChange={onTextFieldValueChange}
              label={labelText}
              margin="normal"
              InputProps={{
                ...params.InputProps,
                ...inputProps,
              }}
            />
          ) : (
            <StyledTextField
              id={id}
              inputRef={inputRef}
              {...params}
              style={{
                margin: noMarginTop ? "0" : "27px 0 0 0",
              }}
              onChange={onTextFieldValueChange}
              label={labelText}
              margin="normal"
            />
          )}
          {isHelperText ? (
            <FormHelperText id={helperTextId} error={error}>
              {helperText}
            </FormHelperText>
          ) : null}
        </>
      )}
    />
  );
}

CustomAutoComplete.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool,
  rtlActive: PropTypes.bool,
};
