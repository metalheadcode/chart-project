import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { store } from "./redux/store";

const initializeApp = (): void => {
    const rootElement = document.getElementById("root");

    if (!rootElement) {
        throw new Error("Failed to find the root element. The application cannot be initialized.");
    }

    const root = ReactDOM.createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
};

// Initialize the application
initializeApp();

// Performance monitoring
if (process.env.NODE_ENV === "development") {
    reportWebVitals(console.log);
} 