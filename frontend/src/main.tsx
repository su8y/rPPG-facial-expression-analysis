import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from "./App.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import '@mantine/core/styles.css';

import {MantineProvider} from '@mantine/core';

const queryClient = new QueryClient(); // Create a new QueryClient instance

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}> {/* Wrap App with QueryClientProvider */}
            <MantineProvider>
                <App/>
            </MantineProvider>
        </QueryClientProvider>
    </StrictMode>,
);
