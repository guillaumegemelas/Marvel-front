import axios from "axios";
import { useState, useEffect } from "react";

import CharacCard from "../Components/CharacCard";
import bandeau from "../img/bandeau.jpg";

//page généraliste sur laquelle apparaîssent tous les personnages par fiche: /characters?
const Characters = () => {
  const [character, setCharacter] = useState();
  const [isLoading, setIsloading] = useState(true);

  const [skip, setSkip] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/characters?apiKey=&name=${name}&skip=${skip}`
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
  }, [name, skip]);

  return (
    <div className="global">
      <img className="bandeau" src={bandeau} alt="" />
      <div className="searchBar">
        <input
          className="search"
          type="text"
          value={name}
          placeholder="  Search"
          onChange={(event) => setName(event.target.value)}
        />

        <input
          className="skip"
          type="number"
          min="1"
          max="15"
          value={skip}
          placeholder="Page"
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
