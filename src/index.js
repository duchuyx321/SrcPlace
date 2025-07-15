import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "~/App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "~/Components/GlobalStyle";
import { Provider } from "react-redux";
import store from "~/App/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <GlobalStyle>
                    <App />
                </GlobalStyle>
            </HelmetProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
