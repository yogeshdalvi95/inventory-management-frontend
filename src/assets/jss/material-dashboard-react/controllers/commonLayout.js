import {
  grayColor,
  defaultFont,
  primaryColor,
  whiteColor,
  blackColor,
  hexToRgb,
} from "../../material-dashboard-react";

const styles = {
  detailPanelGrid: {
    padding: "1rem !important",
  },
  table: {
    height: "35rem",
    "& tfoot tr td div:nth-child(1)": {
      justifyContent: "center",
      flex: "initial",
      ...defaultFont,
      fontWeight: 600,
      fontSize: "0.75rem",
      color: "#8A8A97",
    },
    "& tfoot tr td ": {
      border: "none !important",
      ...defaultFont,
      fontWeight: 500,
      fontSize: "1rem",
      "& > div": {
        display: "flex",
        flexWrap: "wrap",
      },
    },
    "& tfoot tr td div:nth-child(2) span": {
      ...defaultFont,
      fontWeight: 500,
      fontSize: "1rem",
    },
    "& .MuiTypography-caption": {
      ...defaultFont,
      fontWeight: 500,
      fontSize: "0.75rem",
      color: "#000",
    },
    "& th": {
      ...defaultFont,
      color: "#4B5563 !important",
      fontSize: "12px !important",
      fontWeight: "500 !important",
      lineHeight: "12px !important",
      letterSpacing: "0.15px !important",
      borderBottom: "1px solid #e0e0e0 !important",
      padding: "0.7rem !important",
      textAlign: "left",
      flexDirection: "row",
      backgroundColor: "#F4F5F7",
      height: "20px",
    },
    "& td": {
      ...defaultFont,
      padding: "0.7rem !important",
      textAlign: "left",
      fontSize: "12px !important",
      fontWeight: "400 !important",
      lineHeight: "12px !important",
      letterSpacing: "0.15px !important",
      border: "none",
      color: "#1F2937",
      flexDirection: "row",
    },
  },
  switchBox: {
    paddingTop: "0.8rem !important",
  },
  switchBoxInFilter: {
    paddingTop: "2.5rem !important",
  },
  extendedIcon: {
    marginRight: "1rem",
  },
  imageDiv: {
    width: "max-content",
    marginRight: "auto",
    marginTop: "3rem",
  },
  inputFile: {
    display: "none",
  },
  DefaultNoImage: {
    width: "750px",
    height: "200px",
    objectFit: "contain",
    backgroundColor: "#f3f3f3",
    border: "2px solid #aba5a5 !Important",
  },
  UploadImage: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    backgroundColor: "#f3f3f3",
    border: "2px solid #aba5a5 !Important",
    // marginLeft: "18%"
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  componentBorder: {
    margin: "0.5rem",
    border: "0.5px solid " + grayColor[4],
    borderRadius: "0.5rem",
  },
  backdrop: {
    zIndex: 1000,
    color: "#fff",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  cardHeaderStyles: {
    width: "max-content",
  },
  addDeleteFabButon: {
    marginTop: "auto",
    display: "flex",
    justifyContent: "center",
  },
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  typo1: {
    paddingLeft: "1rem",
    position: "relative",
  },
  h5: {
    fontWeight: 600,
    fontSize: "1.25em",
    fontFamily: "Montserrat !important",
    color: "#8A8A97 !important",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  title: {
    ...defaultFont,
    letterSpacing: "unset",
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    margin: "0",
    "&:hover,&:focus": {
      background: "transparent",
    },
  },
  switchBase: {
    color: primaryColor[0] + "!important",
  },
  switchIcon: {
    boxShadow: "0 1px 3px 1px rgba(" + hexToRgb(blackColor) + ", 0.4)",
    color: whiteColor + " !important",
    border: "1px solid rgba(" + hexToRgb(blackColor) + ", .54)",
  },
  switchIconChecked: {
    borderColor: primaryColor[0],
    transform: "translateX(0px)!important",
  },
  switchBar: {
    width: "30px",
    height: "15px",
    backgroundColor: "rgb(" + hexToRgb(grayColor[18]) + ")",
    borderRadius: "15px",
    opacity: "0.7!important",
  },
  switchChecked: {
    "& + $switchBar": {
      backgroundColor: "rgba(" + hexToRgb(primaryColor[0]) + ", 1) !important",
    },
    "& $switchIcon": {
      borderColor: primaryColor[0],
    },
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex",
  },
  addIconOnImage: {
    transform: "translate(-110%, -700%)",
    cursor: "pointer",
    padding: "7px",
    paddingRight: "2px",
  },
  editIconOnImage: {
    transform: "translate(-215%, -700%)",
    cursor: "pointer",
    padding: "7px",
    paddingRight: "2px",
  },
  deleteIconOnImage: {
    transform: "translate(-215%, -700%)",
    cursor: "pointer",
    padding: "7px",
    paddingRight: "2px",
  },
  colorPrimary: {
    color: primaryColor[0],
  },
};

export default styles;
