const temp = [
  {
    class: "IGST 5.00%",
    total: 0,
    // scheme: 2000,
    discount: 0,
    igst: 0,
  },
  {
    class: "IGST 12.00%",
    total: 0,
    // scheme: 0,
    discount: 0,
    igst: 0,
  },
  {
    class: "IGST 18.00%",
    total: 0,
    // scheme: 0,
    discount: 0,
    igst: 0,
  },
];

const obj = {
  total: 1,
};
temp[0].total = temp[0].total + obj.total; // result is = 0 + 1 === 1
console.log([...temp]); // but here, the value is 2 not 1
