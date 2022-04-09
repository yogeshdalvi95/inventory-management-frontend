import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
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

export const apiUrl = process.env.REACT_APP_SERVER_URL;

const useStyles = makeStyles(styles);

const UpdateInventory = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const tableRef = React.createRef();

  const [snackBar, setSnackBar] = React.useState({
    show: false,
    severity: "",
    message: "",
  });

  const [filter, setFilter] = useState({
    orderBy: "id",
    order: "ASC",
  });

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Total stock",
      field: "stock_available",
      render: (rowData) =>
        rowData.stock_available ? rowData.stock_available : 0,
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
    if (columnId >= 0) {
      orderByColumn = columns[columnId]["field"];
    }
    setFilter((filter) => ({
      ...filter,
      orderBy: orderByColumn,
      order: direction.toUpperCase(),
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
      fetch(apiUrl + "/api/inventories?" + new URLSearchParams(params), {
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
        });
    });
  };

  console.log("filter ", filter);

  return (
    <GridContainer>
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
            <GridContainer>
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
                      orderBy: "updated_at",
                      order: "DESC",
                    });
                    tableRef.current.onQueryChange();
                  }}
                >
                  Cancel
                </Button>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Table
                  tableRef={tableRef}
                  title="Departments"
                  columns={columns}
                  data={async (query) => {
                    return await getInventoryData(
                      query.page + 1,
                      query.pageSize
                    );
                  }}
                  actions={[
                    (rowData) => ({
                      icon: () => <EditIcon fontSize="small" />,
                      tooltip: "Edit",
                      onClick: (event, rowData) => {
                        navigate();
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
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default UpdateInventory;
