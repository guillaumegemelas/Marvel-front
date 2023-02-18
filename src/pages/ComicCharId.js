//page qui fait une requete à "comics/${charId}?
import axios from "axios";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import background from "../img/background.jpg";

const ComicCharId = () => {
  const [comCharId, setComCharId] = useState();
  const [isLoading, setIsloading] = useState(true);

  const { characterId } = useParams();
  //bien nommer characterId comme dans la page App.js
  //console.log(useParams()); //affiche {characterId: '5fcf91f6d8a2480017b91456'}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/comics/${characterId}?apiKey=`
        );

        setComCharId(response.data);
        // console.log(response.data);

        setIsloading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId]);

  return (
    <div className="charPage">
      {isLoading ? (
        // temps de chargement ok
        <h1>chargement</h1>
      ) : (
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
            <img
              //   pour afficher les imgs, méthodo doc API
              src={background}
              alt="background img"
            />
          )}

          <h1>{comCharId.name}</h1>
          <div className="titles">
            <p>{comCharId.title}</p>
            {/* il faut refaire un map pour lister les comics associés au perso */}
            {comCharId.comics.map((detail, index) => {
              const key = Object.keys(detail)[2];
              //renvoie au nom des films qui concerne le character
              //   console.log(detail[key]);
              return (
                <div key={index}>
                  <p>{detail[key]}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicCharId;
