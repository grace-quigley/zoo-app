// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const categories = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Electrical',
    description: 'electrical tools'
  },
  {
    id: '1d76b0dd-f800-46eb-8fa4-bf76352b919c',
    name: 'Plumbing',
    description: 'plumbing tools'
  },
  {
    id: 'e1717e4e-583f-404e-aa41-5242e24e8a0d',
    name: 'Paint',
    description: 'painting supplies'
  },
];

const items = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Black Vinyl Electrical Tape',
    category_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    location_id: 'da447b53-027d-42b0-b1ca-b057c7b1681f',
    description: 'Scotch',
    quantity: 5,
    image_url: '/items/black-electrical-tape.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Orange Wire Nuts',
    category_id: '410544b2-4001-4271-9855-fec4b6a6442a',
    location_id: 'da447b53-027d-42b0-b1ca-b057c7b1681f',
    description: "",
    quantity: 25,
    image_url: '/items/orange-wire-nuts.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    category_id: '1d76b0dd-f800-46eb-8fa4-bf76352b919c',
    name: 'Oatey Purple PVC Cement',
    location_id: "a0342d48-d9ed-46e5-a8d7-6f7f98e6de69",
    description: 'oatey brand purple bonding PVC cement',
    quantity: 1,
    image_url: '/items/oatey-pvc-purple-cement.png',
  },
  {
    id: 'e1717e4e-583f-404e-aa41-5242e24e8a0d',
    category_id: '4b7e7197-d2af-468d-9a82-8cc6153de4e4',
    name: 'Floetrol',
    location_id: "",
    description: 'Floetrol for paint consistency',
    quantity: 1,
    image_url: '/items/floetrol.png',
  },
  // {
  //   id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
  //   name: 'Amy Burns',
  //   email: 'amy@burns.com',
  //   image_url: '/customers/amy-burns.png',
  // },
  // {
  //   id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
  //   name: 'Balazs Orban',
  //   email: 'balazs@orban.com',
  //   image_url: '/customers/balazs-orban.png',
  // },
];

const locations = [
  {
    id: 'a0342d48-d9ed-46e5-a8d7-6f7f98e6de69',
    name: 'Bin 1',
    description: 'Storage Room Rack 2'
  },
  {
    id: '4b7e7197-d2af-468d-9a82-8cc6153de4e4',
    name: 'Bin 2',
    description: 'Storage Room Rack 2'
  },
  {
    id: 'da447b53-027d-42b0-b1ca-b057c7b1681f',
    name: 'Bin 3',
    description: 'Storage Room Rack 2'
  }
];

// const revenue = [
//   { month: 'Jan', revenue: 2000 },
//   { month: 'Feb', revenue: 1800 },
//   { month: 'Mar', revenue: 2200 },
//   { month: 'Apr', revenue: 2500 },
//   { month: 'May', revenue: 2300 },
//   { month: 'Jun', revenue: 3200 },
//   { month: 'Jul', revenue: 3500 },
//   { month: 'Aug', revenue: 3700 },
//   { month: 'Sep', revenue: 2500 },
//   { month: 'Oct', revenue: 2800 },
//   { month: 'Nov', revenue: 3000 },
//   { month: 'Dec', revenue: 4800 },
// ];

export { categories, items, locations };
