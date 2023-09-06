import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdminProvider from "./context/AdminContex";
import AppLayout from "./layout/AppLayout";
import AppRoutes from "./components/appRoutes";
import Login from "./pages/login/Login";
import ModalProvider from "./context/ModalContex";
import { reactQueryConfig } from "./config/config.js";

const queryClient = new QueryClient(reactQueryConfig);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <ModalProvider>
          <BrowserRouter>
            <AppLayout>
              <AppRoutes />
            </AppLayout>
          </BrowserRouter>
        </ModalProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
