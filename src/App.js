import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { reactRouter } from "./Route/Router";

function App() {
  // Create a client

  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <div id="blankMap">
          <div className="container mx-auto">
            <div className="home-background border bg-[#ececec90] p-2 relative">
              <RouterProvider router={reactRouter} />
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
