import App from './App'
import './index.css'
import { createRoot } from 'react-dom/client';
import React from 'react';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import { CarrinhoProvider } from './Context/CarrinhoContext.tsx';
import { PedidoProvider } from './Context/PedidoContext.tsx';
import { AdminProvider } from './Context/AdminContext.tsx';
import { RealTimeProvider } from './Context/RealTimeContext.tsx';

const root = createRoot(document.querySelector('#root'));
root.render(
    <RealTimeProvider>
        <AdminProvider>
            <PedidoProvider>
                <CarrinhoProvider>
                    <App/>
                </CarrinhoProvider>
            </PedidoProvider>
        </AdminProvider>
    </RealTimeProvider>
    
);