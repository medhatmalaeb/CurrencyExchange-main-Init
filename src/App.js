import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import { CurrencyContextProvider } from "./CurrencyContext";
import Details from "./components/Details/Details";


function App() {
  return (
    <>
      <CurrencyContextProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="details" element={<Details />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </CurrencyContextProvider>

    </>
  );
}

export default App;
