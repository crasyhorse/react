import ReactDOM from 'react-dom/client';
import type { Container } from 'react-dom/client';

import App from '@/App';
import '@/index.css';

const root: Container = document.getElementById("root") as Container;

ReactDOM.createRoot(root).render(<App />);

