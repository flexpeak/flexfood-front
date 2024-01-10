import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login/>
  },
  {
    path: '/cadastro',
    element: <Cadastro/>
  },
  {
    path: '/home',
    element: <Home/>
  }
])

export default router