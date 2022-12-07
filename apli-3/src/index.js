import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./login/index";
import Aplicacion_usuario from "./aplicacion_usuario";
import Registro from "./Registro";

//import App from "./App";

//import Dashboard from "./dashboard";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Aplicacion_administrador from "./aplicacion_administrador";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/app_usuario",
    element: <Aplicacion_usuario />,
  },{
    path: "/registro",
    element: <Registro/>
  },{
    path: "/app_administrador",
    element: <Aplicacion_administrador />
  }

  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
