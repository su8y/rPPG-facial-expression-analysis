import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from "./App.tsx";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'; // Import QueryClient and QueryClientProvider
import '@mantine/core/styles.css';

import {MantineProvider} from '@mantine/core';
import LoadingIndicator from "./components/LoadingIndicator.tsx";

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
                    <App/>
                </Suspense>
            </MantineProvider>
        </QueryClientProvider>
    </StrictMode>,
);
