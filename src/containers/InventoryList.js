import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CustomInput,
  FAB,
  GridContainer,
  GridItem,
} from "../components";
import { makeStyles } from "@material-ui/core";
import ListAltIcon from "@material-ui/icons/ListAlt";
import styles from "../assets/jss/material-dashboard-react/controllers/commonLayout";
import moment from "moment";
import { Button, SnackBarComponent, Table } from "../components";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import ListIcon from "@mui/icons-material/List";
import { validateNumber } from "../utils";

export const apiUrl = process.env.REACT_APP_SERVER_URL;

const useStyles = makeStyles(styles);

const InventoryList = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const tableRef = React.createRef();

  const [snackBar, setSnackBar] = React.useState({
    show: false,
    severity: "",
    message: "",
  });

  const [filter, setFilter] = useState({
    _sort: "id:asc",
  });

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Total stock",
      field: "stock_available",
      render: (rowData) => {
        let unit = rowData.unit?.name ? rowData.unit.name : "";
        let newUnit = "";
        let qty = validateNumber(rowData.stock_available);
        let altQty = 0;
        if (unit === "kgs") {
          altQty = qty * 1000;
          newUnit = "grams";
        } else {
          altQty = qty / 1000;
          newUnit = "kgs";
        }

        return (
          <>
            <Typography
              variant="h6"
              gutterBottom
              component="span"
              sx={{ mr: 1 }}
            >
              {qty}
            </Typography>
            {`${unit} /`}
            <Typography
              variant="h6"
              gutterBottom
              component="span"
              sx={{ mr: 1, ml: 1 }}
            >
              {altQty}
            </Typography>
            {`${newUnit}`}
          </>
        );
      },
    },
  ];

  // useEffect(() => {
  //   let startDate = moment(new Date()).format("YYYY-MM-DDT00:00:00.000Z");
  //   let endDate = moment(new Date())
  //     .endOf("day")
  //     .format("YYYY-MM-DDT23:59:59.999Z");
  //   setFilter((filter) => ({
  //     ...filter,
  //     created_at_gte: new Date(startDate).toISOString(),
  //     created_at_lte: new Date(endDate).toISOString(),
  //   }));
  // }, []);

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
      delete filter["date_lte"];
      setFilter((filter) => ({
        ...filter,
      }));
    } else {
      endDate = new Date(endDate).toISOString();
      setFilter((filter) => ({
        ...filter,
        date_lte: endDate,
      }));
    }
  };

  const getInventoryData = async (page, pageSize) => {
    let params = {
      page: page,
      pageSize: pageSize,
    };

    Object.keys(filter).map((res) => {
      if (!params.hasOwnProperty(res)) {
        params[res] = filter[res];
      }
    });

    return new Promise((resolve, reject) => {
      fetch(apiUrl + "/inventories?" + new URLSearchParams(params), {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
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
  };

  return (
    <Grid container>
      <SnackBarComponent
        open={snackBar.show}
        severity={snackBar.severity}
        message={snackBar.message}
        handleClose={snackBarHandleClose}
      />
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" className={classes.cardHeaderStyles}>
            <ListAltIcon fontSize="large" />
            <p className={classes.cardCategoryWhite}></p>
          </CardHeader>
          <CardBody>
            <Typography variant="h6" gutterBottom component="div">
              Inventories
            </Typography>

            <GridContainer>
              <GridItem xs={12} sm={12} md={2}>
                <CustomInput
                  onChange={(event) => {
                    setFilter((filter) => ({
                      ...filter,
                      name_contains: event.target.value,
                    }));
                  }}
                  labelText="Name"
                  value={filter.name_contains}
                  name="name_contains"
                  formControlProps={{
                    fullWidth: true,
                  }}
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
                  }}
                >
                  Search
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    setFilter({
                      _sort: "id:asc",
                    });
                    tableRef.current.onQueryChange();
                  }}
                >
                  Cancel
                </Button>
              </GridItem>
            </GridContainer>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Table
                  tableRef={tableRef}
                  title={null}
                  columns={columns}
                  data={async (query) => {
                    return await getInventoryData(
                      query.page + 1,
                      query.pageSize
                    );
                  }}
                  actions={[
                    (rowData) => ({
                      icon: () => <ListIcon fontSize="small" />,
                      tooltip: "Inventory stock updates",
                      onClick: (event, rowData) => {
                        navigate("/inventory-stock-updates/" + rowData.id);
                      },
                    }),
                  ]}
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
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};

export default InventoryList;
