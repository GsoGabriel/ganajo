import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormCadastro from './FormularioCadastroCliente.tsx';
import './identificacao.css';
import { IMaskInput } from 'react-imask';
import FormWithAutoFill from './FormularioCEP.tsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Address {
    street: string;
    city: string;
    state: string;
    neighborhood: string;
}

const fetchAddressFromBackend = (phone: string): Address | null => {
    // Simular uma solicitação para buscar o endereço associado ao telefone no backend
    // Esta parte do código deve ser substituída pela chamada real para o backend
    if (phone === '123456789') { // Mock para um número específico de telefone
        return {
            street: 'Rua Exemplo',
            city: 'Cidade Exemplo',
            state: 'UF',
            neighborhood: 'Bairro Exemplo'
        };
    } else {
        return null;
    }
};


const IdentificacaoCliente: React.FC = () => {
    const navigate = useNavigate();
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [phone, setPhone] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [address, setAddress] = useState<Address | null>(null);

    useEffect(() => {
        const cachedPhone = localStorage.getItem('cachedPhone');
        if (cachedPhone) {
            setPhone(cachedPhone);
            fetchAddress(cachedPhone);
        }
    }, []);

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    const fetchAddress = async (cachedPhone: string) => {
        const address = fetchAddressFromBackend(cachedPhone);
        if (address) {
            setAddress(address);
            setShowForm(true);
        } else {
            toast.error('Telefone não encontrado no sistema.');
        }
    };

    const handleConsultAnotherNumber = () => {
        setPhone('');
        setAddress(null);
        setShowForm(false);
        setShowRegistrationForm(false);
    };

    const handleChangeAddress = () => {
        setShowRegistrationForm(true);
    };

    const handleConfirmAddress = () => {
        toast.success('Endereço confirmado!');
    };


    const handleSearch = () => {
        // Lógica para verificar no banco de dados se o telefone existe
        const phoneExists = false; // Exemplo: assumindo que o telefone existe

        if (phoneExists) {
            // Redirecionar para a próxima página se o telefone for encontrado
            console.log('Telefone encontrado. Redirecionando...');
            navigate('/next-page');
        } else {
            // Exibir o formulário de inscrição
            setShowRegistrationForm(true);
        }
    };

    return (
        <Container>
            {showForm ? (
                <>
                    <div>
                        <h2 className="text-center">Telefone identificado: {phone}:</h2>
                        <p className="text-center">Rua: {address?.street}</p>
                        <p className="text-center">Cidade: {address?.city}</p>
                        <p className="text-center">Estado: {address?.state}</p>
                        <p className="text-center">Bairro: {address?.neighborhood}</p>
                        <div className="text-center">
                            <Button onClick={handleConfirmAddress}>Confirmar Endereço</Button>
                            <Button variant="secondary" onClick={handleConsultAnotherNumber}>Consultar outro número</Button>
                            <Button variant="secondary" onClick={handleChangeAddress}>Mudar Endereço</Button>
                        </div>
                    </div>
                    <div>
                        {showRegistrationForm && (
                            <FormWithAutoFill />
                        )}
                    </div>
                    <ToastContainer />
                </>
            ) : (
                <>
                    <div>
                        <Form id='telefoneHelpBlock'>
                            <Row className="justify-content-md-center" xs={1} md={2}>
                                <Col md={4}>
                                    <Stack>
                                        <div className="p-2" id='tituloCadastro'><h3>Já possui cadastro?</h3></div>
                                        <div className="p-2" id='subTituloCadastro'>Digite seu número de telefone que possua WhatsApp, de preferência.</div>
                                    </Stack>
                                    <Stack direction='horizontal' gap={6} >
                                        <Form.Control
                                            className="me-auto"
                                            as={IMaskInput}
                                            mask="(00) 00000-0000"
                                            type="text"
                                            placeholder='Seu número de telefone...' />
                                        <div className="p-2">
                                            <Button onClick={handleSearch}>Pesquisar</Button>
                                        </div>
                                    </Stack>
                                </Col>
                            </Row>
                        </Form>
                    </div >
                    <div>
                        {showRegistrationForm && (
                            <FormWithAutoFill />
                        )}
                    </div>
                </>
            )}<ToastContainer />
        </Container>
    );
};

export default IdentificacaoCliente;