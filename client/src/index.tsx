import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store,{persistor} from "./store/store";
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
import { CLIENT_ID_GOOGLE } from "./utils/someconstants";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GoogleOAuthProvider clientId={`${process.env.REACT_APP_CLIENT_ID}`}>

  
     <Provider store={store}>
  <PersistGate persistor={persistor} loading={null}>
     <App />
  </PersistGate>
     
   
  </Provider>
 </GoogleOAuthProvider>
);
