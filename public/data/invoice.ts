export const inventoryData = [
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
    Header: "item_name",
    accessor: "item_name" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "item_category",
    accessor: "item_category" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "stock_in_hand",
    accessor: "stock_in_hand" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "phy_stock_in_hand",
    accessor: "phy_stock_in_hand" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "variation",
    accessor: "variation" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "box_size",
    accessor: "box_size" as const,
    type: "text",
    required: true,
  },
  {
    Header: "no_of_boxes",
    accessor: "no_of_boxes" as const,
    type: "number",
    required: true,
    disabled: false,
  },

  {
    Header: "mrp",
    accessor: "mrp" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "hsn_code",
    accessor: "hsn_code" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "max_stock_value",
    accessor: "min_stock_value" as const,
    type: "number",
    required: false,
    disabled: false,
  },
  {
    Header: "max_stock_value",
    accessor: "max_stock_value" as const,
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
