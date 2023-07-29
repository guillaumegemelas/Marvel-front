import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import ComicCard from "../Components/ComicCard";
// import bandeauCom from "../img/bandeauCom.png";

const Comics = ({ token }) => {
  const [comics, setComics] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState("");

  //useEffect pour se positionner en haut de la page en venant de charachter page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://site--marvel-back--zqfvjrr4byql.code.run/comics?apiKey=&skip=${skip}&title=${title}`
      );
      setComics(response.data);
      setIsloading(false);
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  }, [skip, title]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {/* <img className="bandeau" src={bandeauCom} alt="" /> */}
      <div className="searchBar">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchData();
          }}
        ></form>
        <input
          className="search"
          type="text"
          value={title}
          placeholder="  Search"
          onChange={(event) => setTitle(event.target.value)}
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
        <button type="submit">Rechercher</button>
      </div>

      {isLoading ? (
        <div className="isLoading">
          <p>En cours de chargement...</p>
        </div>
      ) : (
        <div>
          <ComicCard comics={comics} token={token} />
        </div>
      )}
    </div>
  );
};

export default Comics;
