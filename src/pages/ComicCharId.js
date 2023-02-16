//page qui fait une requete à "comics/${charId}?apiKey=${apiKey}""`
import axios from "axios";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

const ComicCharId = ({ apiKey }) => {
  const [comCharId, setComCharId] = useState();
  const [isLoading, setIsloading] = useState(true);

  const { characterId } = useParams();
  //bien nommer characterId comme dans la page App.js
  //console.log(useParams()); //affiche {characterId: '5fcf91f6d8a2480017b91456'}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-back--zqfvjrr4byql.code.run/comics/${characterId}?apiKey=${apiKey}`
        );

        setComCharId(response.data);
        console.log(response.data);

        setIsloading(false);
      } catch (error) {
        console.log(error.message);
        console.log(error.response);
      }
    };
    fetchData();
  }, [apiKey, characterId]);

  return (
    <div className="charPage">
      {isLoading ? (
        <p>En cours de chargement...</p>
      ) : (
        <div
          className="resultChar"
          //   style={{
          //     backgroundImage: `${comCharId.thumbnail.path}.${comCharId.thumbnail.extension}`,
          //   }}
        >
          <div className="imgChar">
            <img
              //   pour afficher les imgs, méthodo doc API
              src={`${comCharId.thumbnail.path}.${comCharId.thumbnail.extension}`}
              alt=""
            />
          </div>

          <h1>{comCharId.name}</h1>
          <div className="titles">
            <p>{comCharId.title}</p>
            {/* il faut refaire un map pour lister les comics associés au perso */}
            {comCharId.comics.map((detail) => {
              const key = Object.keys(detail)[2];
              //renvoie au nom des films qui concerne le character
              console.log(detail[key]);
              return (
                <div>
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
