import React from 'react';
import { Container, Typography, Box, Link as MuiLink } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
import styles from './Contato.module.css';

const Contato = () => {
  return (
    <Container className={styles.container} maxWidth={false}>
      <Box textAlign="center" mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Restaurante Ganajo
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <LocationOnIcon className={styles.icon} />
          <Typography variant="body1" component="p">
            <strong>Endereço:</strong> Av. Sargento de Milícias, 811, casa 58 - Pavuna, Rio de Janeiro - CEP: 21532-290
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <PhoneIcon className={styles.icon} />
          <Typography variant="body1" component="p">
            <strong>Telefone:</strong> (21) 96500-2058
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <EmailIcon className={styles.icon} />
          <Typography variant="body1" component="p">
            <strong>Email:</strong> rosangela-rso@hotmail.com
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <BusinessIcon className={styles.icon} />
          <Typography variant="body1" component="p">
            <strong>CNPJ:</strong> 28.544.819/0001-39
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <AccessTimeIcon className={styles.icon} />
          <Typography variant="body1" component="p">
            <strong>Horário de Funcionamento:</strong> 11h às 15h
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <LinkIcon className={styles.icon} />
          <Typography variant="body1" component="p">
            <strong>iFood:</strong>{' '}
            <MuiLink
              href="https://www.ifood.com.br/delivery/rio-de-janeiro-rj/ganajo-pavuna/789820f1-c39d-4393-a37a-83e9cbb891b2?utm_medium=share"
              target="_blank"
              rel="noopener noreferrer"
            >
              Restaurante Ganajo no iFood
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Contato;
