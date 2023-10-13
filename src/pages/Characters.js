import axios from "axios";
import { useState, useEffect, useMemo } from "react";

import CharacCard from "../Components/CharacCard";
import { useDebounce } from "../Hooks/useDebounce";

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

  //abortController:
  const abortController = useMemo(() => new AbortController(), []);
  const signal = abortController.signal;

  //requete avec debounce:
  const debouncedRequest = useDebounce(async () => {
    try {
      const response = await axios.get(
        `https://site--marvel-back--zqfvjrr4byql.code.run/characters?apiKey=&name=${name}&skip=${skip}`,
        {
          cancelToken: signal.token,
        }
      );
      setCharacter(response.data);
      console.log(response.data, "log character");
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
  });

  useEffect(() => {
    debouncedRequest();
    return () => {
      abortController.abort();
    };
  }, [name, skip, abortController, debouncedRequest]);

  return (
    <div className="global">
      <div className="searchBar">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="search"
            type="text"
            value={name}
            placeholder="  Search"
            onChange={(event) => {
              setName(event.target.value);
              debouncedRequest();
            }}
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
        </form>
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
