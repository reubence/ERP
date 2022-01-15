"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6541:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useUser)
/* harmony export */ });
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1175);
/* harmony import */ var react_query__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_query__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_supabaseClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6777);


const getUser = async (userId)=>{
    const { data , error  } = await _utils_supabaseClient__WEBPACK_IMPORTED_MODULE_1__/* .supabase.from */ .O.from("users").select().eq("id", userId).single();
    if (error) {
        console.log("Error bhai");
        throw new Error(error.message);
    }
    if (!data) {
        console.log("Error bhai");
        throw new Error("User not found");
    }
    return data;
};
function useUser() {
    const user = _utils_supabaseClient__WEBPACK_IMPORTED_MODULE_1__/* .supabase.auth.user */ .O.auth.user();
    return (0,react_query__WEBPACK_IMPORTED_MODULE_0__.useQuery)("user", ()=>{
        return getUser(user === null || user === void 0 ? void 0 : user.id);
    });
};


/***/ }),

/***/ 9093:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@headlessui/react"
var react_ = __webpack_require__(7505);
// EXTERNAL MODULE: external "@heroicons/react/outline"
var outline_ = __webpack_require__(8768);
// EXTERNAL MODULE: external "@heroicons/react/solid"
var solid_ = __webpack_require__(1143);
;// CONCATENATED MODULE: ./components/Layout/Breadcrumbs.tsx

/* This example requires Tailwind CSS v2.0+ */ 
const pages = [
    {
        name: 'Projects',
        href: '#',
        current: false
    },
    {
        name: 'Project Nero',
        href: '#',
        current: true
    }, 
];
function Breadcrumb(props) {
    return(/*#__PURE__*/ jsx_runtime_.jsx("nav", {
        className: "hidden sm:flex sm:visible",
        "aria-label": "Breadcrumb",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ol", {
            role: "list",
            className: "bg-cream-light rounded-md shadow px-6 flex space-x-4",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("li", {
                    className: "flex",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex items-center",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                            href: "#",
                            className: "text-gray-400 hover:text-gray-500",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(solid_.HomeIcon, {
                                    className: "flex-shrink-0 h-5 w-5",
                                    "aria-hidden": "true"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "sr-only",
                                    children: "Home"
                                })
                            ]
                        })
                    })
                }),
                pages.map((page)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: "flex",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                    className: "flex-shrink-0 w-6 h-full text-gray-200",
                                    viewBox: "0 0 24 44",
                                    preserveAspectRatio: "none",
                                    fill: "currentColor",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                        d: "M.293 0l22 22-22 22h1.414l22-22-22-22H.293z"
                                    })
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    href: page.href,
                                    className: "ml-4 text-sm font-medium text-gray-500 hover:text-gray-700",
                                    "aria-current": page.current ? 'page' : undefined,
                                    children: page.name
                                })
                            ]
                        })
                    }, page.name)
                )
            ]
        })
    }));
};

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react-query"
var external_react_query_ = __webpack_require__(1175);
// EXTERNAL MODULE: ./utils/supabaseClient.ts
var supabaseClient = __webpack_require__(6777);
;// CONCATENATED MODULE: ./hooks/useLogout.ts



const logout = async ()=>{
    const { error  } = await supabaseClient/* supabase.auth.signOut */.O.auth.signOut();
    if (error) {
        throw error;
    }
};
function useLogOut() {
    const router = (0,router_.useRouter)();
    const queryClient = (0,external_react_query_.useQueryClient)();
    return (0,external_react_query_.useMutation)(()=>logout()
    , {
        onSuccess: ()=>{
            queryClient.removeQueries();
            router.push("/auth/login");
        }
    });
};

// EXTERNAL MODULE: ./hooks/useUser.ts
var useUser = __webpack_require__(6541);
;// CONCATENATED MODULE: ./components/Layout/SideBar-Nav.tsx

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/ 







const navigation = [
    {
        name: "Home",
        href: "/",
        icon: outline_.HomeIcon,
        current: false
    },
    {
        name: "Ledger",
        href: "/ledger",
        icon: outline_.LibraryIcon,
        current: false
    },
    {
        name: "Sales",
        href: "/sales",
        icon: outline_.CurrencyRupeeIcon,
        current: false
    },
    {
        name: "Purchase",
        href: "/purchase",
        icon: outline_.ShoppingCartIcon,
        current: false
    },
    {
        name: "Payments",
        href: "/payments",
        icon: outline_.CashIcon,
        current: false
    },
    {
        name: "Inventory",
        href: "/inventory",
        icon: outline_.ArchiveIcon,
        current: false
    },
    {
        name: "Analytics",
        href: "/analytics",
        icon: outline_.ChartPieIcon,
        current: false
    },
    {
        name: "Settings",
        href: "/settings",
        icon: outline_.CogIcon,
        current: false
    }, 
];
const userNavigation = [
    {
        name: "Your profile",
        href: "/profile"
    },
    {
        name: "Sign out",
        href: "/signout"
    }, 
];
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
function SideBar({ children  }) {
    const { 0: mobileMenuOpen , 1: setMobileMenuOpen  } = (0,external_react_.useState)(false);
    const router = (0,router_.useRouter)();
    const { data , isLoading  } = (0,useUser/* default */.Z)();
    const logoutMutation = useLogOut();
    if (logoutMutation.isSuccess) {
        router.push("/auth/login");
    }
    return(/*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "h-screen flex ",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "hidden w-28 bg-cream-light overflow-y-auto md:block border-r-2 border-coffee-light",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "w-full py-6 flex flex-col items-center ",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "flex-shrink-0 flex items-center",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                    className: "h-8 w-auto",
                                    src: "https://tailwindui.com/img/logos/workflow-mark.svg?color=black",
                                    alt: "Workflow"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "flex-1 mt-6 w-full px-2 space-y-1",
                                children: navigation.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                        href: item.href,
                                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                            // href={item.href}
                                            className: classNames(item.href === router.asPath ? "bg-coffee-light text-cream-light" : "text-coffee-light hover:bg-cofffee-light hover:text-accent-light hover:ring-2 hover:ring-accent-light", "group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"),
                                            "aria-current": item.href === router.asPath ? "page" : undefined,
                                            children: [
                                                /*#__PURE__*/ jsx_runtime_.jsx(item.icon, {
                                                    className: classNames(item.href === router.asPath ? "text-cream-light" : "text-coffee-light group-hover:text-accent-light", "h-6 w-6"),
                                                    "aria-hidden": "true"
                                                }, item.name),
                                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                    className: "mt-2",
                                                    children: item.name
                                                })
                                            ]
                                        }, item.name)
                                    }, item.name)
                                )
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(react_.Transition.Root, {
                    show: mobileMenuOpen,
                    as: external_react_.Fragment,
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Dialog, {
                        as: "div",
                        className: "fixed inset-0 z-40 flex md:hidden",
                        onClose: setMobileMenuOpen,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(react_.Transition.Child, {
                                as: external_react_.Fragment,
                                enter: "transition-opacity ease-linear duration-300",
                                enterFrom: "opacity-0",
                                enterTo: "opacity-100",
                                leave: "transition-opacity ease-linear duration-300",
                                leaveFrom: "opacity-100",
                                leaveTo: "opacity-0",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Dialog.Overlay, {
                                    className: "fixed inset-0 bg-gray-600 bg-opacity-75"
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(react_.Transition.Child, {
                                as: external_react_.Fragment,
                                enter: "transition ease-in-out duration-300 transform",
                                enterFrom: "-translate-x-full",
                                enterTo: "translate-x-0",
                                leave: "transition ease-in-out duration-300 transform",
                                leaveFrom: "translate-x-0",
                                leaveTo: "-translate-x-full",
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: "relative max-w-xs w-full bg-coffee-light pt-5 pb-4 flex-1 flex flex-col",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_.Transition.Child, {
                                            as: external_react_.Fragment,
                                            enter: "ease-in-out duration-300",
                                            enterFrom: "opacity-0",
                                            enterTo: "opacity-100",
                                            leave: "ease-in-out duration-300",
                                            leaveFrom: "opacity-100",
                                            leaveTo: "opacity-0",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "absolute top-1 right-0 -mr-14 p-1",
                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                    type: "button",
                                                    className: "h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-accent-light",
                                                    onClick: ()=>setMobileMenuOpen(false)
                                                    ,
                                                    children: [
                                                        /*#__PURE__*/ jsx_runtime_.jsx(outline_.XIcon, {
                                                            className: "h-6 w-6 text-cream-light",
                                                            "aria-hidden": "true"
                                                        }),
                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                            className: "sr-only",
                                                            children: "Close sidebar"
                                                        })
                                                    ]
                                                })
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "flex-shrink-0 px-4 flex items-center",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                className: "h-8 w-auto",
                                                src: "https://tailwindui.com/img/logos/workflow-mark.svg?color=white",
                                                alt: "Workflow"
                                            })
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "mt-5 flex-1 h-0 px-2 overflow-y-auto",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("nav", {
                                                className: "h-full flex flex-col",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "space-y-1",
                                                    children: navigation.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                            href: item.href,
                                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                                                //   href={item.href}
                                                                className: classNames(item.current ? "border-cream-light text-coffee-light" : "text-cream-light hover:border-cream-light hover:text-cream-light", "group py-2 px-3 rounded-md flex items-center text-sm font-medium"),
                                                                "aria-current": item.current ? "page" : undefined,
                                                                children: [
                                                                    /*#__PURE__*/ jsx_runtime_.jsx(item.icon, {
                                                                        className: classNames(item.current ? "text-accent-light" : "text-cream-light group-hover:text-accent-light", "mr-3 h-6 w-6"),
                                                                        "aria-hidden": "true"
                                                                    }),
                                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                        children: item.name
                                                                    })
                                                                ]
                                                            }, item.name)
                                                        })
                                                    )
                                                })
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "flex-shrink-0 w-14",
                                "aria-hidden": "true"
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex-1 flex flex-col overflow-hidden",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("header", {
                            className: "w-full",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "relative z-10 flex-shrink-0 h-16 bg-cream border-b-2 border-coffee shadow-sm flex",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                        type: "button",
                                        className: "border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-light md:hidden",
                                        onClick: ()=>setMobileMenuOpen(true)
                                        ,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "sr-only",
                                                children: "Open sidebar"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx(outline_.MenuAlt2Icon, {
                                                className: "h-6 w-6",
                                                "aria-hidden": "true"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "flex-1 flex justify-between pr-4 sm:pr-6",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "flex-1 flex",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx(Breadcrumb, {
                                                })
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                className: "ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6",
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Menu, {
                                                        as: "div",
                                                        className: "relative flex-shrink-0",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(react_.Menu.Button, {
                                                                    className: "bg-coffee-light rounded-full flex text-sm outline-none ring-2 ring-offset-2 ring-coffee-light hover:ring-accent-light",
                                                                    children: [
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                            className: "sr-only",
                                                                            children: "Open user menu"
                                                                        }),
                                                                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                                                                            className: "h-8 w-8 rounded-full",
                                                                            src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80",
                                                                            alt: ""
                                                                        })
                                                                    ]
                                                                })
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx(react_.Transition, {
                                                                as: external_react_.Fragment,
                                                                enter: "transition ease-out duration-100",
                                                                enterFrom: "transform opacity-0 scale-95",
                                                                enterTo: "transform opacity-100 scale-100",
                                                                leave: "transition ease-in duration-75",
                                                                leaveFrom: "transform opacity-100 scale-100",
                                                                leaveTo: "transform opacity-0 scale-95",
                                                                children: /*#__PURE__*/ jsx_runtime_.jsx(react_.Menu.Items, {
                                                                    className: "origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg p-1 bg-coffee-light",
                                                                    children: userNavigation.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(react_.Menu.Item, {
                                                                            children: ({ active  })=>/*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                                                                    href: item.href,
                                                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                                                        onClick: ()=>logoutMutation.mutate()
                                                                                        ,
                                                                                        href: item.href,
                                                                                        className: classNames(active ? "bg-cream-light" : "text-cream-light", "block px-4 py-2 text-sm rounded-md"),
                                                                                        children: item.name
                                                                                    })
                                                                                })
                                                                        }, item.name)
                                                                    )
                                                                })
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                        type: "button",
                                                        className: "flex p-1 items-center justify-center text-coffee-light hover:text-accent-light focus-within:rounded-full focus-within:ring-2 focus-within:ring-accent-light focus-within:text-accent-light",
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx(outline_.BellIcon, {
                                                                className: "h-7 w-7",
                                                                "aria-hidden": "true"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                                className: "sr-only",
                                                                children: "Add file"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        children
                    ]
                })
            ]
        })
    }));
};

;// CONCATENATED MODULE: external "react-query/devtools"
const devtools_namespaceObject = require("react-query/devtools");
;// CONCATENATED MODULE: ./pages/_app.tsx






const queryClient = new external_react_query_.QueryClient({
    defaultOptions: {
        queries: {
            retry: 0
        }
    }
});
function MyApp({ Component , pageProps  }) {
    const router = (0,router_.useRouter)();
    {
        if ("/auth/login" === router.asPath || "/auth/signup" === router.asPath) {
            return(/*#__PURE__*/ jsx_runtime_.jsx("html", {
                className: "h-full bg-cream-light",
                children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
                    className: "h-full overflow-hidden",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_query_.QueryClientProvider, {
                        client: queryClient,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                                ...pageProps
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(devtools_namespaceObject.ReactQueryDevtools, {
                                position: "bottom-right"
                            })
                        ]
                    })
                })
            }));
        } else {
            return(/*#__PURE__*/ jsx_runtime_.jsx("html", {
                className: "h-full bg-cream-light",
                children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
                    className: "h-full overflow-hidden",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_query_.QueryClientProvider, {
                        client: queryClient,
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(SideBar, {
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                                    ...pageProps
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(devtools_namespaceObject.ReactQueryDevtools, {
                                    position: "bottom-right"
                                })
                            ]
                        })
                    })
                })
            }));
        }
    }
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 7505:
/***/ ((module) => {

module.exports = require("@headlessui/react");

/***/ }),

/***/ 8768:
/***/ ((module) => {

module.exports = require("@heroicons/react/outline");

/***/ }),

/***/ 1143:
/***/ ((module) => {

module.exports = require("@heroicons/react/solid");

/***/ }),

/***/ 2885:
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 1175:
/***/ ((module) => {

module.exports = require("react-query");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [730,664,777], () => (__webpack_exec__(9093)));
module.exports = __webpack_exports__;

})();