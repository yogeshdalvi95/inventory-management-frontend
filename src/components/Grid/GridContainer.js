import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

const styles = {
  grid: {
    margin: "0 -15px !important",
    width: "unset",
  },
  noWidthGrid: {},
};

const useStyles = makeStyles(styles);

export default function GridContainer(props) {
  const classes = useStyles();
  const { children, noWidth, className, ...rest } = props;
  const cardHeaderClasses = classNames({
    [classes.noWidthGrid]: noWidth !== undefined,
    [classes.grid]: noWidth === undefined || noWidth === null,
    [className]: className !== undefined,
  });

  return (
    <Grid container {...rest} className={cardHeaderClasses}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  children: PropTypes.node,
};
