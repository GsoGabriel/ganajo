import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../../LoginAdmin/LoginAdmin.css';
import { loginAxiosRequest } from '../../../../Api/ganajoClient.ts';

function FormLoginAdminComponent({ setIsAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usuario = await loginAxiosRequest(email, password);
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
    } catch (error) {
      console.error('Erro de login:', error.message);
      setErrorMessage('Erro de login: Credenciais inválidas');
    }
  };

  return (
    <Form className='l-form-login mb-3' onSubmit={handleSubmit}>
      <div className='l-logo  mb-4'>
        {/* <img src={LogoLogin} alt="Logo Ganajo" /> */}
        <h2 className="ganajo-title mb-4" >Ganajo Admin</h2>
        <h4>Entrar</h4>
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email do Usuário</Form.Label>
        <Form.Control 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </Form.Group>
      
      <div className={`error-message ${errorMessage ? 'show' : 'leave'}`}>
        {errorMessage}
      </div>
      
      <Button className='l-s-buttonEntrar' variant="primary" type="submit">
        Entrar
      </Button>
    </Form>
  );
}

export default FormLoginAdminComponent;
