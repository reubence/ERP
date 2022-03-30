import { UserIcon } from "@heroicons/react/solid";
export const ledgerData = [
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
          props.value === "Seller"
            ? `text-xs text-white border-2 bg-primary-50 border-primary-50 px-3 py-1 rounded-full`
            : `text-xs text-white border-2 bg-red-500 border-red-500 px-3 py-1 rounded-full`
        }
      >
        {props.value}
      </span>
    ),
  },
  {
    Header: "Responsible Person",
    accessor: "responsible_person" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Responsible Person Phone",
    accessor: "responsible_person_phone" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Company Name",
    accessor: "company_name" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Company Type",
    accessor: "company_type" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Work Address",
    accessor: "work_address" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Home Address",
    accessor: "home_address" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  { Header: "City", accessor: "city" as const, type: "text", required: true },
  {
    Header: "Pincode",
    accessor: "pincode" as const,
    type: "text",
    required: true,
    disabled: false,
  },

  {
    Header: "State",
    accessor: "state_" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Country",
    accessor: "country" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Marriage Anniversary",
    accessor: "anniversary" as const,
    type: "date",
    required: false,
    disabled: false,
  },
  {
    Header: "Company Phone",
    accessor: "company_phone" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "Company Email",
    accessor: "company_email" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "GSTIN",
    accessor: "gstin" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  {
    Header: "DL No.",
    accessor: "drug_lisence" as const,
    type: "text",
    required: true,
    disabled: false,
  },
  { Header: "PAN", accessor: "pan" as const, type: "text", required: true },
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
