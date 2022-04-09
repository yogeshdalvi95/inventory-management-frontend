import React from "react";
import { Routes as Switch, Route, Navigate } from "react-router-dom";
import {
  CheckStock,
  InventoryList,
  InventoryStockUpdateList,
  UpdateInventory,
} from "../containers";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/inventory" element={<InventoryList />}></Route>
      <Route
        exact
        path="/update-inventory"
        element={<UpdateInventory />}
      ></Route>
      <Route
        exact
        path="/inventory-stock-updates/:id"
        element={<InventoryStockUpdateList />}
      ></Route>
      <Route exact path="/check-stock" element={<CheckStock />}></Route>
      <Route path="*" element={<Navigate to="/inventory" replace />} />
    </Switch>
  );
};

export default Routes;
