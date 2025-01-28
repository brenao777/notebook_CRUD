import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import App from './app/App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
