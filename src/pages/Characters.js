import axios from "axios";
import { useState, useEffect } from "react";

import CharacCard from "../Components/CharacCard";
// import bandeau from "../img/bandeau.jpg";

//Page généraliste sur laquelle apparaîssent tous les personnages par fiche: /characters?---
const Characters = ({ token }) => {
  const [character, setCharacter] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [skip, setSkip] = useState("");
  const [name, setName] = useState("");

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    //test Abortcontroller---------------
    const abortController = new AbortController();
    const signal = abortController.signal;
    //-----------------------------------

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/characters?apiKey=&name=${name}&skip=${skip}`,
          {
            //-----------------
            cancelToken: signal.token,
            //-----------------
          }
        );
        setCharacter(response.data);
        setIsloading(false);
      } catch (error) {
        //-----------------
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error.message);
        } else {
          console.error("error fetching data:", error);
        }
        //-----------------
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
    //-----------------
    return () => {
      abortController.abort();
    };
    //-----------------
  }, [name, skip]);

  return (
    <div className="global">
      {/* <img className="bandeau" src={bandeau} alt="" /> */}
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
          <CharacCard character={character} token={token} />
        </div>
      )}
    </div>
  );
};

export default Characters;
