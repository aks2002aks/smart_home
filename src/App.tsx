import React from "react";
import "./App.css";
import AuthProvider from "./provider/authContext";
import Routes from "./router/routes";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
