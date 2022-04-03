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
    Header: "Group",
    accessor: "group_" as const,
    type: "dropdown",
    required: true,
    disabled: false,
    Cell: (props: any) => (
      <span
        className={
          props.value === "High"
            ? `text-xs text-white bg-secondary-100 px-4 py-2 rounded-full`
            : props.value === "Low"
            ? `text-xs text-white bg-red-500 px-4 py-2 rounded-full`
            : `text-xs text-gray-800 bg-gray-300 px-4 py-2 rounded-full`
        }
      >
        {props.value}
      </span>
    ),
  },

  {
    Header: "Item Name",
    accessor: "item_name" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Item Category",
    accessor: "item_category" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Stock In Hand",
    accessor: "stock_in_hand" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "Physical Stock In Hand",
    accessor: "phy_stock_in_hand" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "Variation",
    accessor: "variation" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "Box Size",
    accessor: "box_size" as const,
    type: "text",
    required: true,
  },
  {
    Header: "Pack Size",
    accessor: "pack_size" as const,
    type: "text",
    required: true,
  },
  {
    Header: "No Of Boxes",
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
    Header: "mfr",
    accessor: "mfr" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "ptr",
    accessor: "ptr" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "expiry",
    accessor: "expiry" as const,
    type: "date",
    required: true,
    disabled: false,
  },
  {
    Header: "rate",
    accessor: "rate" as const,
    type: "number",
    required: true,
    disabled: false,
  },
  {
    Header: "batch no",
    accessor: "batch_no" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "HSN Code",
    accessor: "hsn_code" as const,
    type: "text",
    required: true,
    disabled: false,
    regex: "\\d{8}",
  },
  {
    Header: "max stock value",
    accessor: "max_stock_value" as const,
    type: "number",
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
