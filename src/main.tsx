import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryProvider } from './providers/QueryProvider';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>
);
