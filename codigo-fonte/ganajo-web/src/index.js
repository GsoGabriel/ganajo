import App from './App'
import './index.css'
import { createRoot } from 'react-dom/client';
import React from 'react';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import { CarrinhoProvider } from './Context/CarrinhoContext.tsx';

const root = createRoot(document.querySelector('#root'));
root.render(
    <CarrinhoProvider>
        <App/>
    </CarrinhoProvider>
);