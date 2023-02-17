import axios from "axios";
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import CharacCard from "../Components/CharacCard";

//page généraliste sur laquelle apparaîssent tous les personnages par fiche: /characters?
const Characters = () => {
  const [character, setCharacter] = useState();
  const [isLoading, setIsloading] = useState(true);
  //   const navigate = useNavigate();
  const [limit, setLimit] = useState("");
  const [skip, setSkip] = useState("");
  const [name, setName] = useState("");
  //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/characters?apiKey=&name=${name}&limit=${limit}&skip=${skip}`
        );
        setCharacter(response.data);
        setIsloading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [name, limit, skip]);

  return (
    <div>
      <div className="searchBar">
        <input
          className="search"
          type="text"
          value={name}
          placeholder="  Search"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          className="limit"
          type="text"
          value={limit}
          placeholder="  Limit"
          onChange={(event) => setLimit(event.target.value)}
        />
        <input
          className="skip"
          type="text"
          value={skip}
          placeholder="  Skip"
          onChange={(event) => setSkip(event.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="isLoading">
          <p>En cours de chargement...</p>
        </div>
      ) : (
        <div>
          <CharacCard character={character} />
        </div>
      )}
    </div>
  );
};

export default Characters;
