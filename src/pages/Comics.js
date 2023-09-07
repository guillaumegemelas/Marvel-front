import axios from "axios";
import { useState, useEffect } from "react";
import ComicCard from "../Components/ComicCard";
// import bandeauCom from "../img/bandeauCom.png";

const Comics = ({ token }) => {
  const [comics, setComics] = useState();
  const [isLoading, setIsloading] = useState(true);
  const [title, setTitle] = useState("");
  const [skip, setSkip] = useState("");

  //useEffect pour se positionner en haut de la page en venant de charachter page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/comics?apiKey=&skip=${skip}&title=${title}`,
          {
            cancelToken: signal.token,
          }
        );
        setComics(response.data);
        setIsloading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled:", error.message);
        } else {
          console.error("error fetching data:", error);
        }

        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [title, skip]);

  return (
    <div>
      {/* <img className="bandeau" src={bandeauCom} alt="" /> */}
      <div className="searchBar">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
        </form>
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
