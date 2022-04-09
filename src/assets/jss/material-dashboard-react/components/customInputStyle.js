import {
  primaryColor,
  dangerColor,
  successColor,
  grayColor,
  defaultFont,
} from "../../material-dashboard-react.js";

const customInputStyle = {
  disabled: {
    "&:before": {
      backgroundColor: "transparent !important",
    },
  },
  noMargin: {
    marginTop: "0px !Important",
    marginBottom: "0px !Important",
    paddingBottom: "10px",
    minWidth: "max-content",
  },
  underline: {
    "&:hover:not($disabled):before,&:before": {
      borderColor: grayColor[4] + " !important",
      borderWidth: "1px !important",
    },
    "&:after": {
      borderColor: primaryColor[0],
    },
  },
  underlineError: {
    "&:after": {
      borderColor: dangerColor[0],
    },
  },
  underlineSuccess: {
    "&:after": {
      borderColor: successColor[0],
    },
  },
  labelRoot: {
    ...defaultFont,
    color: grayColor[3] + " !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    letterSpacing: "unset",
  },
  labelRootError: {
    color: dangerColor[0] + " !important",
  },
  labelRootSuccess: {
    color: successColor[0],
  },
  feedback: {
    top: "18px",
    right: "0",
    zIndex: "2",
    display: "block",
    width: "24px",
    height: "24px",
    textAlign: "center",
    pointerEvents: "none",
  },
  marginTop: {
    marginTop: "16px",
  },
  formControl: {
    paddingBottom: "10px",
    margin: "27px 0 0 0",
    position: "relative",
    verticalAlign: "unset",
  },
  noMarginFormControl: {
    paddingBottom: "10px",
    position: "relative",
    verticalAlign: "unset",
  },
  labelRTL: {
    right: 0,
    transition: "all 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
    "&.MuiInputLabel-shrink": {
      transform: "translate(0, 1.5px)",
    },
  },
  input: {
    color: grayColor[7] + " !important",
    fontSize: "0.900rem",
  },
  indeterminateColor: {
    color: "#9c27b0",
  },
  selectAllText: {
    fontWeight: 600,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

export default customInputStyle;
