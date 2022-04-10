import React, { useEffect, useState } from "react";
import {
  AddInventoryStock,
  Card,
  CardBody,
  CardHeader,
  FAB,
  GridContainer,
  GridItem,
} from "../components";
import { makeStyles } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import styles from "../assets/jss/material-dashboard-react/controllers/commonLayout";
import moment from "moment";
import { Button, SnackBarComponent, Table } from "../components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useNavigate } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { convertNumber, useGetIdFromUrl, validateNumber } from "../utils";
import { providerForGet } from "../api";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AddIcon from "@material-ui/icons/Add";
import SweetAlert from "react-bootstrap-sweetalert";
import buttonStyles from "../assets/jss/material-dashboard-react/components/buttonStyle.js";
import classNames from "classnames";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const useStyles = makeStyles(styles);
const buttonUseStyles = makeStyles(buttonStyles);

const InventoryStockUpdateList = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const buttonClasses = buttonUseStyles();
  const tableRef = React.createRef();
  const id = useGetIdFromUrl();
  const [openBackDrop, setBackDrop] = useState(false);
  const [spinnerForInventoryStatus, setSpinnerForInventoryStatus] =
    useState(false);
  const [inventoryData, setInventoryData] = useState(null);
  const [units, setUnits] = useState([]);
  const [openAddInventoryDialog, setOpenAddInventoryDialog] = useState(false);
  const [alert, setAlert] = useState(null);
  const [snackBar, setSnackBar] = React.useState({
    show: false,
    severity: "",
    message: "",
  });
  const [stockStatus, setStockStatus] = useState(null);

  const [filter, setFilter] = useState({
    _sort: "created_at:desc",
  });

  const [stockStatusFilter, setStockStatusFilter] = useState({
    stockAdded: false,
    stockRemoved: false,
  });

  const confirmBtnClasses = classNames({
    [buttonClasses.button]: true,
    [buttonClasses["success"]]: true,
  });

  const cancelBtnClasses = classNames({
    [buttonClasses.button]: true,
    [buttonClasses["danger"]]: true,
  });

  useEffect(() => {
    if (id && id.length && id.length === 1) {
      getInventoryData();
      let startDate = moment().format("YYYY-MM-DDT00:00:00.000Z");
      let endDate = moment().format("YYYY-MM-DDT23:59:59.999Z");
      setFilter((filter) => ({
        ...filter,
        created_at_gte: new Date(startDate).toISOString(),
        created_at_lte: new Date(endDate).toISOString(),
        inventory: id[0],
      }));
      getInventoryStockStatus(
        new Date(startDate).toISOString(),
        new Date(endDate).toISOString(),
        id[0],
        false,
        false
      );
    }
    // get-inventory-stock-status
    getUnits();
  }, [id]);

  const getInventoryStockStatus = async (
    fromDate = filter.created_at_gte,
    toDate = filter.created_at_lte,
    inventory = filter.inventory,
    stockAdded = stockStatusFilter.stockAdded,
    stockRemoved = stockStatusFilter.stockRemoved
  ) => {
    setSpinnerForInventoryStatus(true);
    let params = {
      ...filter,
      created_at_gte: fromDate,
      created_at_lte: toDate,
      inventory: inventory,
    };
    if (!(stockAdded && stockRemoved) && (stockAdded || stockRemoved)) {
      if (stockAdded) {
        params = {
          ...params,
          add_stock: true,
        };
      } else {
        params = {
          ...params,
          add_stock: false,
        };
      }
    } else {
      delete params["add_stock"];
    }

    await providerForGet(
      apiUrl + "/inventory-stock-updates/get-inventory-stock-status",
      params,
      null,
      {}
    )
      .then((res) => {
        setStockStatus(res.data);
        setSpinnerForInventoryStatus(false);
      })
      .catch((err) => {
        setSpinnerForInventoryStatus(false);
      });
  };

  const getUnits = async () => {
    await providerForGet(apiUrl + "/units", {}, null, {})
      .then((res) => {
        setBackDrop(false);
        setUnits(res.data);
      })
      .catch((err) => {
        setBackDrop(false);
        setSnackBar((snackBar) => ({
          ...snackBar,
          show: true,
          severity: "error",
          message: "Error",
        }));
      });
  };

  const getInventoryData = async () => {
    setBackDrop(true);
    await providerForGet(apiUrl + "/inventories/" + id, {}, null, {})
      .then((res) => {
        setBackDrop(false);
        setInventoryData(res.data);
        if (tableRef && tableRef.current) {
          tableRef.current.onQueryChange();
        }
      })
      .catch((err) => {
        setBackDrop(false);
        setSnackBar((snackBar) => ({
          ...snackBar,
          show: true,
          severity: "error",
          message: "Error",
        }));
      });
  };

  const columns = [
    {
      title: "Status",
      field: "add_stock",
      render: (rowData) => {
        return rowData.add_stock ? "Stock Added" : "Stock Used";
      },
    },
    {
      title: "Quantity",
      field: "stock_to_update",
      render: (rowData) => {
        let unit = rowData.unit?.name ? rowData.unit.name : "";
        let qty = rowData.stock_to_update
          ? rowData.stock_to_update + " " + unit
          : 0 + " " + unit;
        return (
          <GridContainer>
            <GridItem>{qty}</GridItem>
            {rowData.add_stock ? (
              <ArrowUpwardIcon fontSize="small" color="success" />
            ) : (
              <ArrowDownwardIcon fontSize="small" color="error" />
            )}
          </GridContainer>
        );
      },
    },
    {
      title: "Price",
      field: "cost",
      render: (rowData) => {
        return convertNumber(validateNumber(rowData.cost), true);
      },
    },
  ];

  const snackBarHandleClose = () => {
    setSnackBar((snackBar) => ({
      ...snackBar,
      show: false,
      severity: "",
      message: "",
    }));
  };

  const orderFunc = (columnId, direction) => {
    let orderByColumn;
    let orderBy = "";
    if (columnId >= 0) {
      orderByColumn = columns[columnId]["field"];
    }
    orderBy = orderByColumn + ":" + direction;
    setFilter((filter) => ({
      ...filter,
      _sort: orderBy,
    }));
    tableRef.current.onQueryChange();
  };

  /** Handle Start Date filter change */
  const handleStartDateChange = (event) => {
    let startDate = moment(event).format("YYYY-MM-DDT00:00:00.000Z");
    if (startDate === "Invalid date") {
      startDate = null;
      delete filter["created_at_gte"];
      setFilter((filter) => ({
        ...filter,
      }));
    } else {
      startDate = new Date(startDate).toISOString();
      setFilter((filter) => ({
        ...filter,
        created_at_gte: startDate,
      }));
    }
  };

  /** Handle End Date filter change */
  const handleEndDateChange = (event) => {
    let endDate = moment(event).endOf("day").format("YYYY-MM-DDT23:59:59.999Z");
    if (endDate === "Invalid date") {
      endDate = null;
      delete filter["created_at_lte"];
      setFilter((filter) => ({
        ...filter,
      }));
    } else {
      endDate = new Date(endDate).toISOString();
      setFilter((filter) => ({
        ...filter,
        created_at_lte: endDate,
      }));
    }
  };

  const getInventoryStockUpdates = async (page, pageSize) => {
    let params = {
      page: page,
      pageSize: pageSize,
    };

    Object.keys(filter).map((res) => {
      if (!params.hasOwnProperty(res)) {
        params[res] = filter[res];
      }
    });

    if (
      !(stockStatusFilter.stockAdded && stockStatusFilter.stockRemoved) &&
      (stockStatusFilter.stockAdded || stockStatusFilter.stockRemoved)
    ) {
      if (stockStatusFilter.stockAdded) {
        params = {
          ...params,
          add_stock: true,
        };
      } else {
        params = {
          ...params,
          add_stock: false,
        };
      }
    } else {
      delete params["add_stock"];
    }

    if (id && id.length && id.length === 1) {
      return new Promise((resolve, reject) => {
        fetch(
          apiUrl + "/inventory-stock-updates?" + new URLSearchParams(params),
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((result) => {
            resolve({
              data: result.data,
              page: result.page - 1,
              totalCount: result.totalCount,
            });
          })
          .catch((err) => {
            setSnackBar((snackBar) => ({
              ...snackBar,
              show: true,
              severity: "error",
              message: "Error",
            }));
            reject();
          });
      });
    } else {
      return {
        data: [],
        page: 0,
        totalCount: 0,
      };
    }
  };

  const handleClose = (status, tRef) => {
    setOpenAddInventoryDialog(false);
    getInventoryStockStatus();
    if (tRef && tRef.current) {
      tRef.current.onQueryChange();
    }
    if (status) {
      setAlert(
        <SweetAlert
          error={status === "error"}
          success={status === "success"}
          title={status === "success" ? "Done" : "Error"}
          onConfirm={() => setAlert(null)}
          confirmBtnCssClass={
            status === "error" ? cancelBtnClasses : confirmBtnClasses
          }
          confirmBtnBsStyle="outline-{variant}"
        >
          {status === "error" ? "Error adding stock" : "Stock Added"}
        </SweetAlert>
      );
    }
  };

  return (
    <Grid container>
      <SnackBarComponent
        open={snackBar.show}
        severity={snackBar.severity}
        message={snackBar.message}
        handleClose={snackBarHandleClose}
      />
      {alert}
      {inventoryData ? (
        <>
          <AddInventoryStock
            handleClose={(status, tRef) => handleClose(status, tRef)}
            open={openAddInventoryDialog}
            inventory={inventoryData}
            units={units}
            tableRef={tableRef}
            availableStock={stockStatus.totalQuntity}
          />
        </>
      ) : null}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" className={classes.cardHeaderStyles}>
            <ListAltIcon fontSize="large" />
            <p className={classes.cardCategoryWhite}></p>
          </CardHeader>

          <CardBody>
            <GridContainer>
              <FAB
                color="primary"
                align={"start"}
                size={"small"}
                toolTip={"Back to design"}
                onClick={() => {
                  navigate("/inventory");
                }}
              >
                <ArrowBackIcon />
              </FAB>
              <GridItem xs={12} sm={12} md={12}>
                <Typography variant="h5" gutterBottom component="div">
                  {inventoryData?.name ? inventoryData.name : ""}
                </Typography>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <FAB
                  color="primary"
                  align={"end"}
                  size={"small"}
                  onClick={() => {
                    setOpenAddInventoryDialog(true);
                  }}
                >
                  <AddIcon />
                </FAB>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date From"
                    value={filter.created_at_gte || null}
                    onChange={(event) => handleStartDateChange(event)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        sx={{
                          mt: "1.5rem",
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date To"
                    value={filter.created_at_lte || null}
                    onChange={(event) => handleEndDateChange(event)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        sx={{
                          mt: "1.5rem",
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <FormControlLabel
                  sx={{ mt: "2rem" }}
                  control={
                    <Switch
                      checked={stockStatusFilter.stockAdded}
                      onChange={(event) => {
                        setStockStatusFilter((stockStatusFilter) => ({
                          ...stockStatusFilter,
                          stockAdded: event.target.checked,
                        }));
                      }}
                      classes={{
                        switchBase: classes.switchBase,
                        checked: classes.switchChecked,
                        thumb: classes.switchIcon,
                        track: classes.switchBar,
                      }}
                    />
                  }
                  classes={{
                    label: classes.label,
                  }}
                  label={"Stock Added"}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <FormControlLabel
                  sx={{ mt: "2rem" }}
                  control={
                    <Switch
                      checked={stockStatusFilter.stockRemoved}
                      onChange={(event) => {
                        setStockStatusFilter((stockStatusFilter) => ({
                          ...stockStatusFilter,
                          stockRemoved: event.target.checked,
                        }));
                      }}
                      classes={{
                        switchBase: classes.switchBase,
                        checked: classes.switchChecked,
                        thumb: classes.switchIcon,
                        track: classes.switchBar,
                      }}
                    />
                  }
                  classes={{
                    label: classes.label,
                  }}
                  label={"Stock Removed"}
                />
              </GridItem>
              <GridItem
                xs={12}
                sm={12}
                md={4}
                style={{
                  marginTop: "27px",
                }}
              >
                <Button
                  color="primary"
                  onClick={() => {
                    tableRef.current.onQueryChange();
                    getInventoryStockStatus();
                  }}
                >
                  Search
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    let startDate = moment().format("YYYY-MM-DDT00:00:00.000Z");
                    let endDate = moment().format("YYYY-MM-DDT23:59:59.999Z");

                    setFilter({
                      _sort: "created_at:desc",
                      inventory: id[0],
                      created_at_gte: new Date(startDate).toISOString(),
                      created_at_lte: new Date(endDate).toISOString(),
                    });
                    setStockStatusFilter({
                      stockAdded: false,
                      stockRemoved: false,
                    });
                    getInventoryStockStatus(
                      new Date(startDate).toISOString(),
                      new Date(endDate).toISOString(),
                      id[0],
                      false,
                      false
                    );
                    tableRef.current.onQueryChange();
                  }}
                >
                  Cancel
                </Button>
              </GridItem>
            </GridContainer>
            {stockStatus ? (
              <Grid container sx={{ mt: 5 }}>
                <GridItem xs={12} sm={12} md={3}>
                  Total Stock :{" "}
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="span"
                    sx={{ mr: 1, ml: 1 }}
                  >
                    {stockStatus.totalQuntity}
                  </Typography>
                  {`${stockStatus.baseUnit} /`}
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="span"
                    sx={{ mr: 1, ml: 1 }}
                  >
                    {stockStatus.totalQuntity1}
                  </Typography>
                  {`${stockStatus.newUnit}`}
                </GridItem>
                {stockStatus.hasOwnProperty("totalUsed") ? (
                  <GridItem xs={12} sm={12} md={3}>
                    Stock Used :{" "}
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="span"
                      sx={{ mr: 1, ml: 1 }}
                    >
                      {stockStatus.totalUsed}
                    </Typography>
                    {`${stockStatus.baseUnit} /`}
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="span"
                      sx={{ mr: 1, ml: 1 }}
                    >
                      {stockStatus.totalUsed1}
                    </Typography>
                    {`${stockStatus.newUnit}`}
                  </GridItem>
                ) : null}
                {stockStatus.hasOwnProperty("totalAdded") ? (
                  <GridItem xs={12} sm={12} md={3}>
                    Stock Added :{" "}
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="span"
                      sx={{ mr: 1, ml: 1 }}
                    >
                      {stockStatus.totalAdded}
                    </Typography>
                    {`${stockStatus.baseUnit} /`}
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="span"
                      sx={{ mr: 1, ml: 1 }}
                    >
                      {stockStatus.totalAdded1}
                    </Typography>
                    {`${stockStatus.newUnit}`}
                  </GridItem>
                ) : null}
                {stockStatus.hasOwnProperty("totalAddedCost") ? (
                  <GridItem xs={12} sm={12} md={3}>
                    Total cost of added stock:{" "}
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="span"
                      sx={{ mr: 1, ml: 1 }}
                    >
                      {convertNumber(stockStatus.totalAddedCost, true)}
                    </Typography>
                  </GridItem>
                ) : null}
              </Grid>
            ) : null}

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Table
                  tableRef={tableRef}
                  title={null}
                  columns={columns}
                  data={async (query) => {
                    return await getInventoryStockUpdates(
                      query.page + 1,
                      query.pageSize
                    );
                  }}
                  actions={[]}
                  options={{
                    pageSize: 10,
                    actionsColumnIndex: -1,
                    search: false,
                    sorting: true,
                    thirdSortClick: false,
                  }}
                  onOrderChange={(orderedColumnId, orderDirection) => {
                    orderFunc(orderedColumnId, orderDirection);
                  }}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      <Backdrop className={classes.backdrop} open={openBackDrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default InventoryStockUpdateList;
