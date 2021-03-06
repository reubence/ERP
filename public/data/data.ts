import { invoiceItems } from "./invoiceItems";
import { invoice } from "./invoice";
import { paymentsData } from "./payments";
import { purchaseData } from "./purchase";
import { salesData } from "./sales";
import { ledgerData } from "./ledger";
import { inventoryData } from "./inventory";
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

  //INVOICE ITEMS
  5: invoiceItems,

  //INVOICE
  6: invoice,
};
