import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";

//import des pages
import Header from "./Components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import ComicCharId from "./pages/ComicCharId";
import Footer from "./Components/Footer";
import Favorites from "./pages/Favorites";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 10 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  return (
    <div className="App">
      <Router>
        <Header handleToken={handleToken} token={token} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comics/:characterId" element={<ComicCharId />} />
          <Route path="/myfavorites" element={<Favorites />} />
          <Route
            path="/user/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route
            path="/user/login"
            element={<Login handleToken={handleToken} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
