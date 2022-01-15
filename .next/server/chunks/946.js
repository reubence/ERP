"use strict";
exports.id = 946;
exports.ids = [946];
exports.modules = {

/***/ 7946:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ SimpleStripedTable)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "react-table"
var external_react_table_ = __webpack_require__(2154);
// EXTERNAL MODULE: external "namor"
var external_namor_ = __webpack_require__(2208);
var external_namor_default = /*#__PURE__*/__webpack_require__.n(external_namor_);
;// CONCATENATED MODULE: ./components/Tables/makeData.tsx

const range = (len)=>{
    const arr = [];
    for(let i = 0; i < len; i++){
        arr.push(i);
    }
    return arr;
};
const newPerson = ()=>{
    const statusChance = Math.random();
    return {
        firstName: external_namor_default().generate({
            words: 1,
            numbers: 0
        }),
        lastName: external_namor_default().generate({
            words: 1,
            numbers: 0
        }),
        age: Math.floor(Math.random() * 30),
        visits: Math.floor(Math.random() * 100),
        progress: Math.floor(Math.random() * 100),
        status: statusChance > 0.66 ? "relationship" : statusChance > 0.33 ? "complicated" : "single"
    };
};
function makeData(...lens) {
    const makeDataLevel = (depth = 0)=>{
        const len = lens[depth];
        return range(len).map((d)=>{
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
            };
        });
    };
    return makeDataLevel();
};

// EXTERNAL MODULE: external "@headlessui/react"
var react_ = __webpack_require__(7505);
// EXTERNAL MODULE: external "@heroicons/react/outline"
var outline_ = __webpack_require__(8768);
;// CONCATENATED MODULE: ./components/Tables/SimpleStripedTable.tsx







function Table({ columns , data , // renderRowSubComponent,
formatRowProps  }) {
    const [open, setOpen] = external_react_default().useState(false);
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps , getTableBodyProps , headerGroups , rows , prepareRow , visibleColumns , // selectedFlatRows,
    state: {} ,  } = (0,external_react_table_.useTable)({
        columns,
        data
    });
    // useMountedLayoutEffect(() => {
    //   console.log("SELECTED ROWS CHANGED", selectedRowIds);
    //   onSelectedRowsChange && onSelectedRowsChange(selectedRowIds);
    // }, [onSelectedRowsChange, selectedRowIds]);
    // const toggleRowOpen = (id: any) => {
    //   if (open === id) {
    //     setOpen(false);
    //   } else {
    //     setOpen(id);
    //   }
    // };
    // Render the UI for your table
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("table", {
                ...getTableProps(),
                className: "min-w-full divide-y divide-gray-200",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("thead", {
                        className: "bg-coffee-light",
                        children: headerGroups.map((headerGroup)=>/*#__PURE__*/ jsx_runtime_.jsx("tr", {
                                ...headerGroup.getHeaderGroupProps(),
                                children: headerGroup.headers.map((column)=>/*#__PURE__*/ jsx_runtime_.jsx("th", {
                                        ...column.getHeaderProps(),
                                        className: "px-6 py-3 text-left text-xs font-medium text-cream-light uppercase tracking-wider",
                                        children: column.render("Header")
                                    })
                                )
                            })
                        )
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("tbody", {
                        ...getTableBodyProps(),
                        className: "bg-cream-light divide-y divide-gray-200",
                        children: rows.map((row, i)=>{
                            prepareRow(row);
                            return(/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
                                children: /*#__PURE__*/ jsx_runtime_.jsx("tr", {
                                    ...row.getRowProps(formatRowProps && formatRowProps(row)),
                                    className: "group",
                                    children: row.cells.map((cell)=>{
                                        return(/*#__PURE__*/ jsx_runtime_.jsx("td", {
                                            ...cell.getCellProps(),
                                            className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:bg-coffee group-hover:text-cream group-hover:cursor-pointer",
                                            children: cell.render("Cell")
                                        }));
                                    })
                                })
                            }));
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("br", {
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                children: [
                    "Showing the first 20 results of ",
                    rows.length,
                    " rows"
                ]
            })
        ]
    }));
}
function App() {
    const { 0: data1 , 1: setData  } = (0,external_react_.useState)(external_react_default().useMemo(()=>makeData(10)
    , []));
    const resetData = ()=>{
        const newData = makeData(5);
        setData(newData);
    };
    const columns = external_react_default().useMemo(()=>[
            // {
            //   id: "selection",
            //   // The header can use the table's getToggleAllRowsSelectedProps method
            //   // to render a checkbox
            //   Header: ({ getToggleAllRowsSelectedProps }) => (
            //     <div>
            //       <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
            //     </div>
            //   ),
            //   // The cell can use the individual row's getToggleRowSelectedProps method
            //   // to the render a checkbox
            //   Cell: ({ row }) => (
            //     <div>
            //       <input type="checkbox" {...row.getToggleRowSelectedProps()} />
            //     </div>
            //   ),
            // },
            // {
            //   // Make an expander cell
            //   Header: () => null, // No header
            //   id: "expander", // It needs an ID
            //   Cell: ({ row }: any) => (
            //     // Use Cell to render an expander for each row.
            //     // We can use the getExpandedToggleProps prop-getter
            //     // to build the expander.
            //     <span {...row.getToggleRowExpandedProps()}>
            //       {row.isExpanded ? "👇" : "👉"}
            //     </span>
            //   ),
            // },
            {
                Header: "Name",
                columns: [
                    {
                        Header: "First Name",
                        accessor: "firstName"
                    },
                    {
                        Header: "Last Name",
                        accessor: "lastName"
                    }, 
                ]
            },
            {
                Header: "Info",
                columns: [
                    {
                        Header: "Age",
                        accessor: "age"
                    },
                    {
                        Header: "Visits",
                        accessor: "visits"
                    },
                    {
                        Header: "Status",
                        accessor: "status"
                    },
                    {
                        Header: "Profile Progress",
                        accessor: "progress"
                    }, 
                ]
            }, 
        ]
    , []);
    // const [selectedRows, setSelectedRows] = useState({ "0": true, "9": true });
    // const selectedRowKeys = Object.keys(selectedRows);
    // let new_data = selectedRows;
    // const renderRowSubComponent = React.useCallback(
    //   ({ row }) => (
    //     <Table
    //       columns={columns}
    //       data={data}
    //       renderRowSubComponent={renderRowSubComponent}
    //     ></Table>
    //   ),
    //   []
    // );
    const { 0: showModal , 1: setShowModal  } = (0,external_react_.useState)("Dont Show");
    const { 0: dataModal , 1: setDataModal  } = (0,external_react_.useState)({
    });
    // const handleClose = () => setShowModal(false);
    // const handleShow = () => setShowModal(true);
    let data_row = {
    };
    const formatTrProps = (state = {
    })=>{
        return {
            onClick: ()=>{
                console.log(state, "qua");
                setShowModal("Show");
                // console.log(showModal);
                data_row = state;
                setDataModal(state);
            // handleShow();
            }
        };
    };
    console.log(dataModal, "HERER");
    const Modal = ({ data  })=>{
        const { 0: open , 1: setOpen  } = (0,external_react_.useState)(true);
        console.log(open);
        console.log(data);
        (0,external_react_.useEffect)(()=>{
            // Update the document title using the browser API
            data;
        }, [
            formatTrProps
        ]);
        return(/*#__PURE__*/ jsx_runtime_.jsx(react_.Transition.Root, {
            show: open,
            as: external_react_.Fragment,
            children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Dialog, {
                as: "div",
                className: "fixed inset-0 overflow-hidden",
                onClose: ()=>setShowModal("Dont Show")
                ,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "absolute inset-0 overflow-hidden",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Transition.Child, {
                            as: external_react_.Fragment,
                            enter: "ease-in-out duration-500",
                            enterFrom: "opacity-0",
                            enterTo: "opacity-100",
                            leave: "ease-in-out duration-500",
                            leaveFrom: "opacity-100",
                            leaveTo: "opacity-0",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Dialog.Overlay, {
                                className: "absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "fixed inset-y-0 mt-10 right-0 pl-10 max-w-full flex",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Transition.Child, {
                                as: external_react_.Fragment,
                                enter: "transform transition ease-in-out duration-500 sm:duration-700",
                                enterFrom: "translate-x-full",
                                enterTo: "translate-x-0",
                                leave: "transform transition ease-in-out duration-500 sm:duration-700",
                                leaveFrom: "translate-x-0",
                                leaveTo: "translate-x-full",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "relative w-screen max-w-md",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Transition.Child, {
                                            as: external_react_.Fragment,
                                            enter: "ease-in-out duration-500",
                                            enterFrom: "opacity-0",
                                            enterTo: "opacity-100",
                                            leave: "ease-in-out duration-500",
                                            leaveFrom: "opacity-100",
                                            leaveTo: "opacity-0",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                    type: "button",
                                                    className: "rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white",
                                                    onClick: ()=>{
                                                        setOpen(false);
                                                        console.log(open);
                                                        setShowModal("Dont Show");
                                                        console.log(showModal);
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "sr-only",
                                                            children: "Close panel"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx(outline_.XIcon, {
                                                            className: "h-6 w-6",
                                                            "aria-hidden": "true"
                                                        })
                                                    ]
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                            className: "h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll",
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "px-4 sm:px-6",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Dialog.Title, {
                                                        className: "text-lg font-medium text-gray-900",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("pre", {
                                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("code", {
                                                                children: [
                                                                    JSON.stringify({
                                                                        // data,
                                                                        data: data.allCells.map((row)=>row.value
                                                                        )
                                                                    }),
                                                                    console.log(data, "ODHAR")
                                                                ]
                                                            })
                                                        })
                                                    })
                                                }),
                                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "mt-6 relative flex-1 px-4 sm:px-6",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "absolute inset-0 px-4 sm:px-6",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                            className: "h-full border-2 border-dashed border-gray-200",
                                                            "aria-hidden": "true"
                                                        })
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                })
                            })
                        })
                    ]
                })
            })
        }));
    };
    // const data = React.useMemo(() => makeData(20), []);
    // const data2 = React.useMemo(() => makeData(10), []);
    return(/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "flex flex-col border-2 border-coffee-light rounded-lg overflow-hidden",
            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "shadow rounded-md",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                onClick: resetData,
                                children: "Reset Data"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(Table, {
                                columns: columns,
                                data: data1,
                                // renderRowSubComponent={renderRowSubComponent}
                                // selectedRows={selectedRows}
                                // onSelectedRowsChange={setSelectedRows}
                                formatRowProps: (state)=>formatTrProps(state)
                            }),
                            showModal === "Show" && /*#__PURE__*/ jsx_runtime_.jsx(Modal, {
                                data: dataModal
                            })
                        ]
                    })
                })
            })
        })
    }));
}
/* harmony default export */ const SimpleStripedTable = (App);


/***/ })

};
;