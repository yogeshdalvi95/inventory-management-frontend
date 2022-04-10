import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "..";
import { hasError, validateNumber } from "../../utils";
import {
  CircularProgress,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/core";
import styles from "../../assets/jss/material-dashboard-react/controllers/commonLayout";
import { providerForPost } from "../../api";

const apiUrl = process.env.REACT_APP_SERVER_URL;

const useStyles = makeStyles(styles);
const AddInventory = (props) => {
  const [error, setError] = useState({});
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const tableRef = React.useRef(props.tableRef);

  const [formState, setFormState] = useState({
    add_stock: true,
    stock_to_update: 1,
    inventory: props.inventory?.id,
    cost: 0,
  });

  useEffect(() => {
    setFormState((formState) => ({
      ...formState,
      unit: props.units && props.units.length ? props.units[0].id : null,
    }));
    tableRef.current = props.tableRef?.current;
  }, [props]);

  const handleSave = async () => {
    setLoading(true);
    await providerForPost(
      apiUrl + "/inventory-stock-updates",
      formState,
      null,
      {},
      {}
    )
      .then((res) => {
        setLoading(false);
        handleClose("success");
      })
      .catch((err) => {
        setLoading(false);
        handleClose("error");
      });
  };

  const handleClose = (status) => {
    setFormState({
      add_stock: true,
      stock_to_update: 1,
      inventory: props.inventory?.id,
      cost: 0,
    });
    props.handleClose(status, tableRef);
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"sm"}
      open={props.open}
      onClose={() => handleClose(null)}
    >
      <DialogTitle>Add Stock Usage</DialogTitle>
      <>
        <DialogContent>
          <DialogContentText>{`${props.inventory?.name}`}</DialogContentText>
          <Grid contaminer>
            <Grid item>
              <FormControlLabel
                sx={{ mt: "2rem" }}
                control={
                  <Switch
                    sx={{}}
                    checked={formState["add_stock"] ? true : false}
                    onChange={(event) => {
                      setFormState((formState) => ({
                        ...formState,
                        add_stock: event.target.checked,
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
                label={formState["add_stock"] ? "Stock Added" : "Stock Removed"}
              />
            </Grid>
          </Grid>
          <Grid contaminer>
            <Grid item>
              <TextField
                onChange={(event) => {
                  let value = event.target.value;
                  let formattedValue = validateNumber(value);
                  if (formattedValue === 0 || formattedValue < 0) {
                    setError((error) => ({
                      ...error,
                      stock_to_update: ["Invalid number"],
                    }));
                  } else {
                    delete error["stock_to_update"];
                    setError((error) => ({
                      ...error,
                    }));
                  }
                  setFormState((formState) => ({
                    ...formState,
                    stock_to_update: value,
                  }));
                }}
                label="Stock Qty"
                value={formState.stock_to_update}
                name="stock_to_update"
                id="stock_to_update"
                type="number"
                InputProps={{
                  fullWidth: true,
                }}
                disabled={loading}
                variant="standard"
                sx={{ mt: "1.5rem" }}
                /** For setting errors */
                helperTextId={"helperText_stock"}
                /** For setting errors */
                isHelperText={hasError("stock_to_update", error)}
                helperText={
                  hasError("stock_to_update", error)
                    ? error["stock_to_update"].map((error) => {
                        return error + " ";
                      })
                    : null
                }
                error={hasError("stock_to_update", error)}
              />
              <FormControl
                variant="standard"
                sx={{
                  m: 1,
                  minWidth: 120,
                  mt: "1.5rem",
                }}
              >
                <InputLabel id="select-for-unit">Unit</InputLabel>
                <Select
                  labelId="select-for-unit"
                  id="select_unit"
                  value={formState.unit}
                  onChange={(event) =>
                    setFormState((formState) => ({
                      ...formState,
                      unit: event.target.value,
                    }))
                  }
                  label="Unit"
                  inputProps={{
                    fullWidth: true,
                  }}
                >
                  {props.units.map((u) => (
                    <MenuItem value={u.id}>{u.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                onChange={(event) => {
                  let value = event.target.value;
                  let formattedValue = validateNumber(value);
                  if (formattedValue < 0) {
                    setError((error) => ({
                      ...error,
                      cost: ["Invalid number"],
                    }));
                  } else {
                    delete error["cost"];
                    setError((error) => ({
                      ...error,
                    }));
                  }
                  setFormState((formState) => ({
                    ...formState,
                    cost: value,
                  }));
                }}
                label="Price"
                value={formState.cost}
                name="cost"
                id="cost"
                type="number"
                InputProps={{
                  fullWidth: true,
                }}
                disabled={loading}
                variant="standard"
                sx={{ mt: "1.5rem" }}
                /** For setting errors */
                helperTextId={"helperText_stock"}
                /** For setting errors */
                isHelperText={hasError("cost", error)}
                helperText={
                  hasError("cost", error)
                    ? error["cost"].map((error) => {
                        return error + " ";
                      })
                    : null
                }
                error={hasError("cost", error)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: "center",
            }}
          >
            <Button onClick={() => handleClose(null)} disabled={loading}>
              Cancel
            </Button>
            <Button
              color="success"
              onClick={handleSave}
              disabled={loading || Object.keys(error).length}
            >
              Add
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: "secondary",
                  position: "absolute",
                  top: "89%",
                  left: "59%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Grid>
        </DialogActions>
      </>
    </Dialog>
  );
};

export default AddInventory;
