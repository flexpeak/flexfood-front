import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import MeuRestaurante from "./pages/MeuRestaurante";
import MeusItens from "./pages/MeusItens";
import Restaurantes from "./pages/Restaurantes";
import Sair from "./pages/Sair";

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
  },
  {
    path: '/meu-restaurante',
    element: <MeuRestaurante/>
  },
  {
    path: '/meus-itens',
    element: <MeusItens/>
  },
  {
    path: '/restaurantes',
    element: <Restaurantes/>
  },
  {
    path: '/sair',
    element: <Sair/>
  }
])

export default router