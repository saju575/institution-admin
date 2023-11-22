import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Main from "./Main";
import AuthProvider from "./providers/AuthProvider";

function App() {
  // Create a client

  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
