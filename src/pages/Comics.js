import axios from "axios";
import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";

import ComicCard from "../Components/ComicCard";
import bandeauCom from "../img/bandeauCom.png";

//page généraliste sur laquelle apparaissent tous les Comics Marvel par ordre
//alphabétique, sous forme de fiches

const Comics = () => {
  const [comics, setComics] = useState();
  const [isLoading, setIsloading] = useState(true);

  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/comics?apiKey=&skip=${skip}&title=${title}`
        );
        setComics(response.data);
        setIsloading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [title, skip]);

  return (
    <div>
      <img className="bandeau" src={bandeauCom} alt="" />
      <div className="searchBar">
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
          <ComicCard comics={comics} />
        </div>
      )}
    </div>
  );
};

export default Comics;
