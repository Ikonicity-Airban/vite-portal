import "./index.css";
import "@inovua/reactdatagrid-community/index.css";

import { QueryClient, QueryClientProvider } from "react-query";

import { AppProvider } from "./api/context.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";

// import * as serviceWorker from "./service-worker.ts";

// import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AppProvider>
  </React.StrictMode>
);

// serviceWorker.register();
