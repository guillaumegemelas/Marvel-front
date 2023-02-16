import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import ComicCard from "../Components/ComicCard";

//page généraliste sur laquelle apparaissent tous les Comics Marvel par ordre
//alphabétique, sous forme de fiches

const Comics = () => {
  const [comics, setComics] = useState();
  const [isLoading, setIsloading] = useState(true);

  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState("");
  const [limit, setLimit] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/comics?apiKey=&limit=${limit}&skip=${skip}&title=${title}`
        );
        setComics(response.data);
        setIsloading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [title, limit, skip]);

  return (
    <div>
      <div className="searchBar">
        <input
          className="search"
          type="text"
          value={title}
          placeholder="  Search"
          onChange={(event) => setTitle(event.target.value)}
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
        <p>En cours de hargement</p>
      ) : (
        <div>
          <ComicCard comics={comics} />
        </div>
      )}
    </div>
  );
};

export default Comics;
