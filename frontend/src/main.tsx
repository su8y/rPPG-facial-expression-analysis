import './index.css'
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import App from "./App.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import {MantineProvider} from '@mantine/core';
import {BrowserRouter} from "react-router-dom";
import {LoadingIndicator} from "./components";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false, // 기본적으로는 retry 제외
        },
    }
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider>
                <Suspense fallback={<LoadingIndicator/>}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </Suspense>
            </MantineProvider>
        </QueryClientProvider>
    </StrictMode>,
);
