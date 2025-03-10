import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Router>
            <ClerkProvider publishableKey={PUBLISHABLE_KEY} >
                <App />
            </ClerkProvider>
        </Router>
    </StrictMode>
);
