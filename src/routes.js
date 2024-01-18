import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import MeuRestaurante from "./pages/MeuRestaurante";
import MeusItens from "./pages/MeusItens";
import Restaurantes from "./pages/Restaurantes";
import Sair from "./pages/Sair";
import ListarItens from "./pages/ListarItens";
import AdicionarItens from "./pages/AdicionarItens";

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
  },
  {
    path: '/listar-itens/:restaurante_id',
    element: <ListarItens/>
  },
  {
    path: '/adicionar-itens/:restaurante_id',
    element: <AdicionarItens/>
  }
])

export default router