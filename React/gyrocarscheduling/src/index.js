import React from 'react';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Member from "./routes/Member";
import HomePage from "./routes/HomePage";
import Reserve from "./routes/Reserve";
import Trips from "./routes/Trips";
import FAQ from './routes/FAQ';
import Contact from './routes/Contact';
import LogIn from './routes/LogIn';

import AboutUs from './routes/AboutUs';

import "./App.css";
import reportWebVitals from './reportWebVitals';

const AppLayout = () => (
  <div>
    <Navbar />
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "member",
        element: <Member />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "trips",
        element: <Trips />,
      },
      {
        path: "reserve",
        element: <Reserve />,
      },
      {
        path: "faq",
        element: <FAQ />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
