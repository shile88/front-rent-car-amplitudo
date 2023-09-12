import "./App.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdminProvider from "./context/UserContex";
import AppLayout from "./layout/AppLayout";
import AppRoutes from "./components/appRoutes";
import ModalProvider from "./context/ModalContex";
import PageContent from "./components/pageContent/PageContent";
import { reactQueryConfig } from "./config/config.js";

const queryClient = new QueryClient(reactQueryConfig);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <ModalProvider>
            <AppLayout>
              <AppRoutes />
            </AppLayout>
        </ModalProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
