// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

import { Customer, Expense, LatestReceipt, User } from "./definitions";

export interface Tag { 
  name: string;
}

export interface Location { 
  id: string;
  name: string; 
  description?: string;
  tags: string[];
}

export interface Item {
  id:  string;
  name: string;
  description?: string;
  location_id: string;
  tags: string[];
  image_url?: string;
  quantity?: number;
}

const locations: Location[] = [
  {
    id: 'a0342d48-d9ed-46e5-a8d7-6f7f98e6de69',
    name: 'Rack 1 Bin 1',
    tags: ['#electrical']
  },
  {
    id: '4b7e7197-d2af-468d-9a82-8cc6153de4e4',
    name: 'Rack 1 Bin 2',
    tags: ['#plumbing']
  },
  {
    id: 'da447b53-027d-42b0-b1ca-b057c7b1681f',
    name: 'Rack 1 Bin 3',
    tags: ['#paint']
  }
];

const items: Item[] = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Black Vinyl Electrical Tape',
    location_id: locations[0].id,
    quantity: 5,
    image_url: '/items/black-electrical-tape.png',
    tags: ['#electrical', '#tape']
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Orange Wire Nuts',
    location_id: locations[0].id,
    quantity: 25,
    image_url: '/items/orange-wire-nuts.png',
    tags: ['#electrical']
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Oatey Purple PVC Cement',
    location_id: locations[1].id,
    quantity: 1,
    image_url: '/items/oatey-pvc-purple-cement.png',
    tags: ['#plumbing', '#pvc']
  },
  {
    id: 'e1717e4e-583f-404e-aa41-5242e24e8a0d',
    name: 'Floetrol',
    location_id: locations[2].id,
    quantity: 1,
    image_url: '/items/floetrol.png',
    tags: ['#paint']
  }
];

const users: User[] = [
    {
      id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
      name: 'Grace Quigley',
      email: 'gquigley47@gmail.com.com',
      image_url: '/customers/evil-rabbit.png',
      password: "admin"
    },
    {
      id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
      name: 'Kylee Blad',
      email: 'kyleeblad@gmail.com',
      image_url: '/customers/delba-de-oliveira.png',
      password: "admin"
    },
  
]

const expenses: Expense[] = [
  { month: 'Jan', expense: 2000 , name: 'gas'},
  { month: 'Feb', expense: 1800 , name: 'electric'},
  { month: 'Mar', expense: 2200 , name: 'water'},
  { month: 'Apr', expense: 2500 , name: 'mortgage'},
  { month: 'May', expense: 2300 , name: 'groceries'},
  { month: 'Jun', expense: 3200 , name: 'pet food'},
  { month: 'Jul', expense: 3500 , name: 'medicine'},
  { month: 'Aug', expense: 3700 , name: 'supplies'},
];

const receipts = [
  {
    user_id: users[0].id,
    description: "MidAmerican",
    amount: 15795,
    date: '2024-12-06',
  },
  {
    user_id: users[0].id,
    amount: 20348,
    description: "PetCo",
    date: '2024-11-14',
  },
  {
    user_id: users[0].id,
    amount: 3040,
    description: "Des Moines Water Works",
    date: '2024-10-29',
  },
  {
    user_id: users[1].id,
    amount: 44800,
    description: "Mortgage",
    date: '2023-09-10',
  },
  {
    user_id: users[1].id,
    amount: 34577,
    description: "Aldi",
    date: '2023-08-05',
  },
  {
    user_id: users[1].id,
    amount: 54246,
    description: "Autozone",
    date: '2023-07-16',
  }
];
export { items, locations, expenses, users, receipts };
