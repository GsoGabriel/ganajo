import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout.tsx';
import Home from './Pages/Home/Home.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contato from './Pages/Contato/Contato.tsx';
import BairrosdeEntrega from './Pages/BairrosDeEntrega/bairrosdeentrega.tsx';
import MeusPedidos from './Pages/MeusPedidos/MeusPedidos.tsx';
import Carrinho from './Pages/CarrinhoCompras/CarrinhoComponent.tsx';
import Produtos from './Pages/Produtos/produtos.tsx';
import ProductForm from './Pages/Produtos/Components/adicionarProdutos.tsx';
import Login from './Pages/LoginAdmin/LoginAdmin.tsx';
import PedidoFullComponent from './Pages/Pedido/PedidoFullComponent.tsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useAdminContext } from './Context/AdminContext.tsx';
import StatisticsComponent from './Pages/Statistics/StatisticsComponent.tsx';

function App() {

  const {admin} = useAdminContext();
  
  return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/homeAdmin" element={<MeusPedidos isAdmin={admin !== undefined}/>}/>
            <Route path="/" element={<Home />}/>
            <Route path="/contato" element={<Contato />}/>
            <Route path="/bairrosdeentrega" element={<BairrosdeEntrega/>} />
            <Route path="/pedidoformulario" element={<PedidoFullComponent/>} />
            <Route path="/Carrinho" element={<Carrinho />} />
            <Route path="/Admin" element={<Login />} />
            <Route path="/meuspedidos" element={<MeusPedidos/>} />
            {
              admin !== undefined && <Route path="/statistics" element={<StatisticsComponent/>} />
            }
            {
              admin !== undefined && <Route path="/Produtos" element={<Produtos />} />
            }
            {
              admin !== undefined && <Route path="/addProdutos" element={<ProductForm />} />
            }
          </Routes>
        </Layout>
        <ToastContainer />
      </BrowserRouter>
    
  );
}

export default App
