import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import ComicCard from "../Components/ComicCard";

//page généraliste sur laquelle apparaissent tous les Comics Marvel par ordre
//alphabétique, sous forme de fiches

const Comics = ({ apiKey, limit, skip, title }) => {
  const [comics, setComics] = useState();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/comics?apiKey=${apiKey}&limit=${limit}&skip=${skip}&title=${title}`
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
  }, [apiKey, title, limit, skip]);

  return (
    <div>
      <div>
        <h1>vous etes sur la page Comics</h1>
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
