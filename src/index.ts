import { eq } from "drizzle-orm";
import db from "./drizzle/db";
import {
  stateTable,
  cityTable,
  addressTable,
  restaurantTable,
  menuItemTable,
  categoryTable,
  usersTable,
  restaurantOwnerTable,
  ordersTable,
  driverTable,
  orderMenuItemTable,
  orderStatusTable,
  statusCatalogTable,
  commentsTable,
} from "./drizzle/schema";

import {
  TIState,
  TSState,
  TICity,
  TSCity,
  TIAddress,
  TSAddress,
  TIRestaurant,
  TSRestaurant,
  TIMenuItem,
  TSMenuItem,
  TICategory,
  TSCategory,
  TIUsers,
  TSUsers,
  TIRestaurantOwner,
  TSRestaurantOwner,
  TIOrders,
  TSOrders,
  TIDriver,
  TSDriver,
  TIOrderMenuItem,
  TSOrderMenuItem,
  TIOrderStatus,
  TSOrderStatus,
  TIStatusCatalog,
  TSStatusCatalog,
  TIComments,
  TSComments,
} from "./drizzle/schema";

// create states
const createState = async (state: TIState) => {
  await db.insert(stateTable).values({
    name: state.name,
    code: state.code,
  });
};

// MAIN Functions
async function main() {
  console.log(await createState({
    name: "Kenya",
    code: "254",
  }));
}

main();

console.log("Hello")
