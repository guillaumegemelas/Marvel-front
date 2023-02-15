import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import des pages
import Header from "./Components/Header";
import Characters from "./pages/Characters";
import { useState } from "react";

function App() {
  const [limit, setLimit] = useState("");
  const [skip, setSkip] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/characters"
            element={
              <Characters
                limit={limit}
                skip={skip}
                title={title}
                apiKey={apiKey}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
