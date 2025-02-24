import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';  // Correct import
import App from './App.tsx';
import Register from './LoginPages/Register.tsx';
import Login from './LoginPages/Login.tsx';
import Workspace from './Workspace.tsx';
import Prompt from './prompt.tsx';
import Geeks from './Geeks.tsx';
import "./index.css";
import Zip from './zip.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "workspace",
        element: <Workspace />,
      },
      {
        path: "prompt",
        element: <Prompt />,
      },
      {
        path: "zip",
        element: <Zip/>,
      },
      {
        path: "geeks",
        element: <Geeks />,
      },
    
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
      <RouterProvider router={router}></RouterProvider>
    
  </StrictMode>,
);
