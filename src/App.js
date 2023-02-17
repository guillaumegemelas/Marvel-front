import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import des pages
import Header from "./Components/Header";
import Characters from "./pages/Characters";
import Comics from "./pages/Comics";
import ComicCharId from "./pages/ComicCharId";
import Footer from "./Components/Footer";
import Favorites from "./pages/Favorites";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comics/:characterId" element={<ComicCharId />} />
          <Route path="/myfavorites" element={<Favorites />} />
          <Route path="/user/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
