export const invoiceItems = [
  {
    Header: "ID",
    accessor: "id" as const,
    type: "text",
    required: true,
    disabled: true,
  },
  {
    Header: "Created At",
    accessor: "created_at" as const,
    type: "datetime-local",
    required: false,
    disabled: true,
  },
  {
    Header: "Created By",
    accessor: "created_by" as const,
    type: "text",
    required: true,
    disabled: true,
  },
  {
    Header: "S.No",
    accessor: "s_no" as const,
    type: "number",
    required: true,
    disabled: true,
  },
  {
    Header: "Qty.",
    accessor: "qty" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "Rate",
    accessor: "rate" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "Dis",
    accessor: "discount" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "Product Name",
    accessor: "item_name" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Pack",
    accessor: "pack_size" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Batch",
    accessor: "batch_no" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Exp",
    accessor: "expiry" as const,
    type: "date",
    required: true,
    disabled: false,
  },
  {
    Header: "Mfr",
    accessor: "mfr" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Ptr",
    accessor: "ptr" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "MRP",
    accessor: "mrp" as const,
    type: "number",
    required: true,
    disabled: false,
  },

  {
    Header: "HSN",
    accessor: "hsn_code" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "IGST",
    accessor: "igst" as const,
    type: "number",
    required: false,
    disabled: false,
  },
  {
    Header: "Value",
    accessor: "value_igst" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "Total",
    accessor: "total" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "Group",
    accessor: "group_" as const,
    type: "dropdown",
    required: true,
    disabled: false,
  },
  {
    Header: "Last Updated",
    accessor: "last_updated" as const,
    type: "datetime-local",
    required: false,
    disabled: true,
  },
  {
    Header: "Updated By",
    accessor: "updated_by" as const,
    type: "text",
    required: true,
    disabled: true,
  },
  {
    Header: "Comments",
    accessor: "comments_" as const,
    type: "text",
    required: true,
    disabled: false,
  },
];
