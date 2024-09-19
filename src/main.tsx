import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { persistor, store } from "./store/store.ts";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/integration/react";
import IndexRoutes from "./routes/IndexRoutes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <IndexRoutes />
        </NextUIProvider>
      </PersistGate>
    </Provider>
    <Toaster />
  </React.StrictMode>
);
