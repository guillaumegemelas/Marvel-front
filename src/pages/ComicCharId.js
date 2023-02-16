//page qui fait une requete à "comics/${charId}?apiKey=${apiKey}""`
import axios from "axios";
import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

const ComicCharId = ({ apiKey }) => {
  const [comCharId, setComCharId] = useState();
  const [isLoading, setIsloading] = useState(true);

  const { characterId } = useParams();
  // console.log(charId); // revoie undefined
  console.log(useParams()); //affiche {characterId: '5fcf91f6d8a2480017b91456'}

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
      <div>vous etes sur la page ComicCharId</div>
      {isLoading ? (
        <p>En cours de chargement...</p>
      ) : (
        <div>
          <p>{comCharId.name}</p>
          <p>{comCharId.title}</p>
        </div>
      )}
    </div>
  );
};

export default ComicCharId;
