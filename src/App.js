import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import PageNotFound from "./components/PageNotFound";
import { Qc2Context } from "./context/Qc2Provider";

function App() {
  const { userToken } = useContext(Qc2Context);
  console.log(userToken);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userToken ? <Main /> : <Login />} />
        <Route path="/login" element={<Login />} />
        {/* not found route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
