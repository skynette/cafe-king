import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthProviderWithNavigate from './auth/AuthProviderWithNavigate';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProviderWithNavigate>
          <AppRoutes />
        </AuthProviderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)
