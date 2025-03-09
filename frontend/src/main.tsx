import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { UserProvider } from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

import Routes from './Routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider> 
      <Routes />
    </UserProvider>
  </StrictMode>,
);