import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';

interface Address {
  street: string;
  city: string;
  state: string;
  neighborhood: string;
}

const allowedNeighborhoods = ['Pavuna', 'Neighborhood2', 'Neighborhood3'];

const FormWithAutoFill: React.FC = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    neighborhood: ''
  });
  const [isAddressDisabled, setIsAddressDisabled] = useState(true);
  const [invalidNeighborhood, setInvalidNeighborhood] = useState(false);

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCep(value);
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      const { logradouro, localidade, uf, bairro } = data;
      if (bairro && allowedNeighborhoods.includes(bairro)) {
        setAddress({
          street: logradouro,
          city: localidade,
          state: uf,
          neighborhood: bairro
        });
        setInvalidNeighborhood(false);
        setIsAddressDisabled(false);
      } else {
        setInvalidNeighborhood(true);
        setIsAddressDisabled(true);
        setAddress({
          street: logradouro,
          city: localidade,
          state: uf,
          neighborhood: bairro
        });
        toast.error('O bairro informado não é atendido.');
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      setAddress({
        street: '',
        city: '',
        state: '',
        neighborhood: ''
      });
      setIsAddressDisabled(true);
      setInvalidNeighborhood(false);
    }
  };

  const handleCepBlur = async () => {
    await fetchAddress();
  };

  const handleSearchButtonClick = async () => {
    await fetchAddress();
  };


  return (
    <Container>
      <h2 className="text-center">Preencha seu CEP para autocompletar o endereço</h2>
      <Form>
        <Row className="justify-content-center">
          <Col md={6} className="mx-auto">
            <Form.Group controlId="formCep">
              <Form.Label>CEP:</Form.Label>
              <InputMask mask="99999-999" value={cep} onChange={handleCepChange} onBlur={handleCepBlur}>
                {(inputProps: any) => <Form.Control {...inputProps} />}
              </InputMask>

            </Form.Group>
          </Col>
          <Col md={6} className="mx-auto">
            <Button onClick={handleSearchButtonClick}>Buscar CEP</Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6} className="mx-auto">
            <Form.Group controlId="formStreet">
              <Form.Label>Rua:</Form.Label>
              <Form.Control type="text" value={address.street} readOnly disabled={isAddressDisabled} />
            </Form.Group>
          </Col>
          <Col md={6} className="mx-auto">
            <Form.Group controlId="formCity">
              <Form.Label>Cidade:</Form.Label>
              <Form.Control type="text" value={address.city} readOnly disabled={isAddressDisabled} />
            </Form.Group>
          </Col>
          <Col md={6} className="mx-auto">
            <Form.Group controlId="formState">
              <Form.Label>Estado:</Form.Label>
              <Form.Control type="text" value={address.state} readOnly disabled={isAddressDisabled} />
            </Form.Group>
          </Col>
          <Col md={6} className="mx-auto">
            <Form.Group controlId="formNeighborhood">
              <Form.Label>Bairro:</Form.Label>
              <Form.Control type="text" value={address.neighborhood} readOnly disabled={isAddressDisabled} />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default FormWithAutoFill;