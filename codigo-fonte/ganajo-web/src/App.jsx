import React, { useEffect, useState } from 'react'
import Layout from './Layout/Layout.tsx';
import Home from './Pages/Home/Home.tsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import BairrosdeEntrega from './Pages/BairrosDeEntrega/bairrosdeentrega.tsx';
import MeusPedidos from './Pages/MeusPedidos/MeusPedidos.tsx';
import Carrinho from './Pages/CarrinhoCompras/CarrinhoComponent.tsx';
import Produtos from './Pages/Produtos/produtos.tsx';
import ProductForm from './Pages/Produtos/Components/adicionarProdutos.tsx';
import Login from './Pages/LoginAdmin/LoginAdmin.tsx';
import PedidoFullComponent from './Pages/Pedido/PedidoFullComponent.tsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedAdminStatus = localStorage.getItem('isAdmin'); 
    setIsAdmin(storedAdminStatus === 'true');
  }, []);
  
  return (
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={ isAdmin ? <MeusPedidos isAdmin={isAdmin}/> : <Home />} />
            <Route path="/bairrosdeentrega" element={<BairrosdeEntrega/>} />
            <Route path="/pedidoformulario" element={<PedidoFullComponent/>} />
            <Route path="/Carrinho" element={<Carrinho />} />
            <Route path="/Produtos" element={<Produtos />} />
            <Route path="/Admin" element={<Login setIsAdmin={setIsAdmin} />} />
            {isAdmin ? (
            <>
              <Route path="/meuspedidos" element={<MeusPedidos isAdmin={isAdmin} />} />
              <Route path="/Produto/novo" element={<ProductForm />} /> {}
            </>
          ) : (
            <Route path="/meuspedidos" element={<Navigate to="/" replace />} />
          )}
        </Routes>
        </Layout>
        <ToastContainer />
      </BrowserRouter>
    
  );
}

export default App
