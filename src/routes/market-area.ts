// export * from "./create";
// export * from "./fetch";
// export * from "./fetchById";
// export * from "./update";
// export * from "./delete";

import { Router } from "express";
import { authenticateAdmin, authenticateSubAdmin } from "../middleware";
import {
  fetchState,
  fetchCity,
  fetchLocation,
  addCity,
  addState,
  updateState,
  updateCity,
  deleteState,
  deleteCity,
  addLocation,
  updateLocation,
  deleteLocation,
  fetchCityByState,
} from "../handlers";

export const marketAreaRouter = Router();

// state
marketAreaRouter.get("/state", fetchState);
// admin
marketAreaRouter.post("/admin/state/add", authenticateAdmin, addState);
marketAreaRouter.put("/admin/state/update", authenticateAdmin, updateState);
marketAreaRouter.delete("/admin/state/delte", authenticateAdmin, deleteState);
// sub admin
marketAreaRouter.post("/sub-admin/state/add", authenticateSubAdmin, addState);
marketAreaRouter.put(
  "sub-admin/state/update",
  authenticateSubAdmin,
  updateState
);
marketAreaRouter.delete(
  "sub-admin/state/delte",
  authenticateSubAdmin,
  deleteState
);

// city
marketAreaRouter.post("/city", fetchCity);
// admin
marketAreaRouter.post("/admin/city/add", authenticateAdmin, addCity);
marketAreaRouter.put("/admin/city/update", authenticateAdmin, updateCity);
marketAreaRouter.delete("/admin/city/delte", authenticateAdmin, deleteCity);
// sub admin
marketAreaRouter.post("/sub-admin/city/add", authenticateSubAdmin, addCity);
marketAreaRouter.put(
  "/sub-admin/city/update",
  authenticateSubAdmin,
  updateCity
);
marketAreaRouter.delete(
  "/sub-admin/city/delte",
  authenticateSubAdmin,
  deleteCity
);

// location
marketAreaRouter.post("/admin/location", fetchLocation);
// admin
marketAreaRouter.post("/admin/location/add", authenticateAdmin, addLocation);
marketAreaRouter.put(
  "/admin/location/update",
  authenticateAdmin,
  updateLocation
);
marketAreaRouter.delete(
  "/admin/location/delte",
  authenticateAdmin,
  deleteLocation
);
// sub admin
marketAreaRouter.post(
  "/sub-admin/location/add",
  authenticateSubAdmin,
  addLocation
);
marketAreaRouter.put(
  "/sub-admin/location/update",
  authenticateSubAdmin,
  updateLocation
);
marketAreaRouter.delete(
  "/sub-admin/location/delte",
  authenticateSubAdmin,
  deleteLocation
);
