import "./App.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdminProvider from "./context/UserContext";
import AppRoutes from "./components/routes/appRoutes";
import ModalProvider from "./context/ModalContext";
import { reactQueryConfig } from "./config/config.js";

const queryClient = new QueryClient(reactQueryConfig);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <ModalProvider>
            <AppRoutes />
        </ModalProvider>
      </AdminProvider>
    </QueryClientProvider>
  );
}

export default App;
