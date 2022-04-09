import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import classNames from "classnames";
import styles from "../../assets/jss/material-dashboard-react/components/fabstyles";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  alignend: {
    textAlignLast: "end",
  },
}));

const useStyles1 = makeStyles(styles);

export default function FAB(props) {
  const classes = useStyles();
  const classes1 = useStyles1();
  const { color, children, disabled, className, align, ...rest } = props;
  const btnClasses = classNames({
    [classes1[color]]: color,
    [classes1.disabled]: disabled,
    [className]: className,
  });

  const rootClasses = classNames({
    [classes.root]: true,
    [classes["align" + align]]: align,
  });

  return (
    <div className={rootClasses}>
      {props.toolTip ? (
        <Tooltip title={props.toolTip}>
          <Fab color={color} className={btnClasses} {...rest}>
            {children}
          </Fab>
        </Tooltip>
      ) : (
        <Fab color={color} className={btnClasses} {...rest}>
          {children}
        </Fab>
      )}
    </div>
  );
}
