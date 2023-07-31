//page qui fait une requete à "comics/${charId}?
import axios from "axios";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import background from "../img/background.jpg";
import background1 from "../img/background1.jpg";

const ComicCharId = () => {
  const [comCharId, setComCharId] = useState();
  const [isLoading, setIsloading] = useState(true);

  //characterId (Cf.page App.js)
  const { characterId } = useParams();

  //useEffect pour se positionner en haut de la page en venant de charachter page---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/comics/${characterId}?apiKey=`,
          {
            cancelToken: signal.token,
          }
        );
        setComCharId(response.data);
        console.log(response.data);
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
  }, [characterId]);

  return (
    <div className="charPage">
      {isLoading ? (
        <h1>chargement</h1>
      ) : (
        <div className="test1">
          <div className="containerChar">
            <div className="resultChar">
              {!comCharId.thumbnail.path.includes("image_not_available") ? (
                <div className="imgChar">
                  <img
                    //   pour afficher les imgs, méthodo doc API
                    src={`${comCharId.thumbnail.path}.${comCharId.thumbnail.extension}`}
                    alt=""
                  />
                </div>
              ) : (
                <img src={background} alt="background img" />
              )}

              <h1>{comCharId.name}</h1>
              <div className="titles">
                <p>{comCharId.title}</p>
              </div>
            </div>
          </div>
          <div className="resultsComics">
            <h1>Comics with {comCharId.name}</h1>
            {/* il faut refaire un map pour lister les comics associés au perso */}
            <div className="comicTodisplay">
              {comCharId.comics.map((detail, index) => {
                return (
                  <div key={index} className="comicUnity">
                    {!detail.thumbnail.path.includes("image_not_available") ? (
                      <img
                        //   pour afficher les imgs, méthodo doc API
                        src={`${detail.thumbnail.path}.${detail.thumbnail.extension}`}
                        alt=""
                      />
                    ) : (
                      <img src={background1} alt="background img" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicCharId;
