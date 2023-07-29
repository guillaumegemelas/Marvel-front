import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//import pour react-query
import { QueryClient, QueryClientProvider } from "react-query";

//pour react query
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
