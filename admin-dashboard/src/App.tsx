import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard';
import UserManagement from '@/pages/UserManagement';
import ContentManagement from '@/pages/ContentManagement';
import Analytics from '@/pages/Analytics';
import CategoryManagement from '@/pages/CategoryManagement';
import SystemSettings from '@/pages/SystemSettings';
import Reports from '@/pages/Reports';
import Login from '@/pages/Login';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="soundinkube-admin-theme">
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="content" element={<ContentManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="categories" element={<CategoryManagement />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;