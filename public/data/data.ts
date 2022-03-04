import { inventoryData } from "./inventory";
import { ledgerData } from "./ledger";
import { paymentsData } from "./payments";
import { purchaseData } from "./purchase";
import { salesData } from "./sales";
export const columns = {
  // LEDGER
  0: ledgerData,

  // Inventory
  1: inventoryData,

  //PAYMENTS
  2: paymentsData,

  //PURCHASE
  3: purchaseData,

  //SALES
  4: salesData,
};
